import StockService from "../services/StockService"
import { useState, useEffect } from 'react' 
import { Link } from "react-router-dom"
import { dateChanger, totalCostFmt, formattedPrice } from "../utils/FormatFunctions"

const TradeLedger = (props) => {
    const [stocks, setStocks] = useState([])

    useEffect(() => {
        StockService.getAllStocks()
            .then((res) => {
                console.log(res)
                setStocks(res)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const deleteHandler = (id) => {
        StockService.deleteOneStock(id)
            .then((res) => {
                console.log(res)
                const filteredList = stocks.filter((stock) => stock._id !== id)
                setStocks(filteredList)
            })
    }

    return (
        <div>
            <h1>Trade Ledger</h1>
            <div className="displayContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Ticker</th>
                            <th>Buy/Sell</th>
                            <th>Price</th>
                            <th>Shares</th>
                            <th>Total Cost</th>
                            <th>Shaper</th>
                            <th>Type</th>
                            <th>Open</th>
                            <th>Close</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .map((stock) => (
                                <tr
                                    key={stock._id}
                                    className={`${
                                        stock.openTrade === true
                                            ? "ledgerBuy"
                                            : stock.closeTrade === true
                                            ? "ledgerSell"
                                            : ""
                                    }`}>
                                    {" "}
                                    {/* Conditional class rendering */}
                                    <td>{dateChanger(stock.date)}</td>
                                    <td>{stock.ticker}</td>
                                    <td>{stock.buySell}</td>
                                    <td>{formattedPrice(stock.price)}</td>
                                    <td>{stock.shares}</td>
                                    <td>
                                        {totalCostFmt(stock.price, stock.shares)}
                                    </td>
                                    <td>{stock.shaper}</td>
                                    <td>{stock.type}</td>
                                    <td>{stock.openTrade ? "Yes" : ""}</td>
                                    <td>{stock.closeTrade ? "Yes" : ""}</td>
                                    <td>
                                        <button className="ledgerBtn">
                                            <Link
                                                className="linkBtn"
                                                to={`/update/${stock._id}`}>
                                                EDIT
                                            </Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                deleteHandler(stock._id)
                                            }
                                            className="ledgerBtn">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TradeLedger