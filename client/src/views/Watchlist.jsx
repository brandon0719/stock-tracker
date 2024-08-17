import React, { useState, useEffect } from "react";
import YahooService from "../services/YahooService";
import WatchlistService from "../services/WatchlistService";
import { formattedPrice, formattedPercent } from "../utils/FormatFunctions"

const Watchlist = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    // Load watchlist on component mount
    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const currentWatchlist = await WatchlistService.getWatchlist();
                setWatchlist(currentWatchlist);
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        };
        fetchWatchlist();
    }, []);

    // Search Bar
    useEffect(() => {
        if (searchQuery.length > 0) {
            const handleSearch = async () => {
                try {
                    const results = await WatchlistService.searchStocks(searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error("Error searching stocks:", error);
                }
            };

            handleSearch();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    // Add to Watchlist

    const addToWatchlist = async (symbol) => {
        try {
            console.log("Enter key pressed, adding to watchlist");
            // Check if stock is already in watchlist
            if (watchlist.find((stock) => stock.symbol === symbol)) {
                alert("Stock is already in watchlist");
                return;
            }
            // Get stock Data
            const stockData = await YahooService.getQuote(symbol);
            const name = stockData.chart.result[0].meta.longName;
            const price = stockData.chart.result[0].meta.regularMarketPrice;
            const prevClosingPrice = stockData.chart.result[0].meta.previousClose;
            const change = price - prevClosingPrice;
            const changePercent = (change / prevClosingPrice) * 100;
            const high = stockData.chart.result[0].meta.regularMarketDayHigh;
            const low = stockData.chart.result[0].meta.regularMarketDayLow;
            // Calculate current time
            const timestamps = stockData.chart.result[0].timestamp;
            const latestTimestamp = timestamps[timestamps.length - 1]; // Get the last timestamp
            const ISOdate = new Date(latestTimestamp * 1000); // Convert to Date object
            const date = ISOdate.toLocaleString("en-US", { timeZone: "America/New_York" });
            // Add to watchlist in the backend
            const stock = { symbol: symbol, name: name, price: price, change: changePercent, high: high, low: low, date: date };
            await WatchlistService.addToWatchlist(stock);
            // Update watchlist state
            setWatchlist([
                ...watchlist,
                { symbol, name, price, changePercent, high, low, date },
            ]);
        } catch (error) {
            console.error("Error adding to watchlist:", error);
        }
    };

    return (
        <div className="watchlist-container">
            <h1>Search Stocks</h1>
            <div className="search-bar-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter stock symbol or name"
                    className="search-input"
                />
            </div>

            <ul className="search-results">
                {searchResults.map((result) => (
                    <li key={result.symbol} className="search-result-item">
                        <div>
                            <strong>{result.symbol}</strong>
                            <span className="company-name">{result.name}</span>
                        </div>
                        <button
                            onClick={() => addToWatchlist(result.symbol)}
                            className="add-button">
                            Add
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Watchlist</h2>
            <table className="watchlist-table">
                <thead>
                    <tr>
                        <th>SYMBOL</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CHANGE</th>
                        <th>HIGH</th>
                        <th>LOW</th>
                        <th>UPDATED</th>
                    </tr>
                </thead>
                <tbody>
                    {watchlist.map((stock) => (
                        <tr key={stock.symbol}>
                            <td>{stock.symbol}</td>
                            <td>{stock.name}</td>
                            <td
                                className={
                                    stock.change < 0 ? "price-down" : "price-up"
                                }>
                                {formattedPrice(stock.price)}
                            </td>
                            <td
                                className={
                                    stock.change < 0 ? "price-down" : "price-up"
                                }>
                                {stock.change ? formattedPercent(stock.change): "N/A"}
                            </td>
                            <td>{formattedPrice(stock.high)}</td>
                            <td>{formattedPrice(stock.low)}</td>
                            <td>{stock.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Watchlist;
