import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import YahooService from "../services/YahooService";
import StockService from "../services/StockService";
import { groupTrades, currentInvested, calculateShares } from "../utils/CalcFunctions";
import { formattedPrice, formattedPercent } from "../utils/FormatFunctions";

const CurrentPortfolio = () => {
    // To get the stock prices, we need to fetch the stock symbols from the database
    const [stocks, setStocks] = useState([]);
    const [shares, setShares] = useState([]);
    const [netValue, setNetValue] = useState(0);
    const [livePrices, setLivePrices] = useState({});
    const [fullNames, setFullName] = useState({});

    useEffect(() => {
        StockService.getAllStocks()
            .then((res) => {
                setStocks(groupTrades(res));
                console.log(groupTrades(res));
                setShares(calculateShares(res));
                console.log(calculateShares(res));
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Can be put into its own component (if needed)
    // Fetch LIVE stock prices from Yahoo Finance API
    useEffect(() => {
        async function calculateAssets() {
            try {
                let total = 0;
                const prices = {};  // live prices object
                const fullNames = {}; // full names object
                for (let ticker in shares) {
                    const data = await YahooService.getQuote(ticker);
                    const price = data.chart.result[0].meta.regularMarketPrice;
                    prices[ticker] = price; // Store the live price in the prices object
                    fullNames[ticker] = data.chart.result[0].meta.longName;
                    total += price * shares[ticker];
                }
                setLivePrices(prices); // Set the live prices object
                setFullName(fullNames); // Set the full names object
                setNetValue(total); // Set the total value of the portfolio
            } catch (err) {
                console.error(err);
            }
        }
        // Fetch data initially
        calculateAssets();

        // Set interval to update data every minute (300000 ms) - 5 minutes
        const intervalId = setInterval(calculateAssets, 300000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [shares]);

    // variables 
    let totalInvested = currentInvested(stocks);
    let plPercent = (netValue - totalInvested) / totalInvested * 100;
    return (
        <div className="portofolioContainer">
            <div className="portfolioStats">
                <span className="portfolioStat">
                    <h2>Raw Amount Invested</h2>
                    <p>{formattedPrice(totalInvested)}</p>
                </span>
                <span className="portfolioStat">
                    <h2>Net Account Value</h2>
                    <p>{formattedPrice(netValue)}</p>
                </span>
                <span className="portfolioStat">
                    <h2>Open P&L</h2>
                    <p>{formattedPercent(plPercent)}</p>
                </span>
            </div>
            {/* Table to display currently invested in */}
            <h2 id="portfolioSubHeader">Stocks Currently Invested In</h2>
            <div className="displayContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Name</th>
                            <th>Shares</th>
                            <th>LIVE Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(shares).map(
                            (ticker) =>
                                shares[ticker] > 0 && ( //remove stocks that have 0 shares, i.e. not invested in
                                    <tr key={ticker}>
                                        <td>{ticker}</td>
                                        <td>{fullNames[ticker]}</td>
                                        <td>{shares[ticker]}</td>
                                        <td>
                                            {formattedPrice(
                                                livePrices[ticker] || 0
                                            )}
                                        </td>
                                    </tr>
                                )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CurrentPortfolio;

// I want a currently invested in section, and a total amount invested section, a profit/loss section, and a total value section for the portfolio
// Next, i want a watchlist instead of the to-do list
