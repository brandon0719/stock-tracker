import { useState, useEffect } from "react";
import StockService from "../services/StockService.jsx";

import {
    dateChanger,
    formattedPrice,
    formattedCost,
    formattedPercent,
} from "../utils/FormatFunctions.js";
import {
    groupTrades,
    totalCost,
    avgOpenPrice,
    totalSold,
    avgClosePrice,
    percentGainLoss,
    getOpenDate,
    getCloseDate,
    getOwnedShares,
    gainLoss,
    openTradeTrue,
} from "../utils/CalcFunctions.js";

const TradeStats = (props) => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        StockService.getAllStocks()
            .then((res) => {
                // console.log(res)
                console.log(groupTrades(res));
                setStocks(groupTrades(res));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <h1>Trading Statistics</h1>

            <div className="displayContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Open Date</th>
                            <th>Close Date</th>
                            <th>Avg Open Price</th>
                            <th>Shares</th>
                            <th>Open Cost</th>
                            <th>Close Price</th>
                            <th>Close Value</th>
                            <th>Gain/Loss</th>
                            <th>Gain/Loss %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks
                            .sort(
                                (a, b) =>
                                    new Date(a[0].date) - new Date(b[0].date)
                            )
                            .map((stock, index) => (
                                <tr
                                    key={index}
                                    className={`${
                                        openTradeTrue(stock) === false
                                            ? ""
                                            : gainLoss(stock) > 0
                                            ? "ledgerBuy"
                                            : "ledgerSell"
                                    }`}>
                                    {/* {console.log(openTradeTrue(stock))} */}
                                    <td>{stock[0].ticker}</td>
                                    <td>{dateChanger(getOpenDate(stock))}</td>
                                    <td>{dateChanger(getCloseDate(stock))}</td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {formattedPrice(avgOpenPrice(stock))}
                                    </td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {getOwnedShares(stock)}
                                    </td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {formattedCost(totalCost(stock))}
                                    </td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {formattedPrice(avgClosePrice(stock))}
                                    </td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {formattedCost(totalSold(stock))}
                                    </td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {formattedCost(gainLoss(stock))}
                                    </td>
                                    <td
                                        className={`${
                                            openTradeTrue(stock) === false
                                                ? "hidden"
                                                : ""
                                        }`}>
                                        {formattedPercent(
                                            percentGainLoss(stock)
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TradeStats;
