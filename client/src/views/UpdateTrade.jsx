import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StockService from "../services/StockService";

import UpdateTradeHandler from "../hooks/UpdateTradeHandler";

// Same code as AddTrade but with a few changes
const UpdateTrade = (props) => {
    const { id } = useParams(); // added
    const navigate = useNavigate();
    // Moved to different file for better organization
    const { handleChange, stockState, setStockState, formErrors } = UpdateTradeHandler();
    const [errors, setErrors] = useState([]);

    // For disabling the button
    const validateForm = () => {
        return Object.values(formErrors).every((value) => value === "");
    };
    // added
    useEffect(() => {
        StockService.getOneStock(id)
            .then((res) => {
                console.log(res);
                setStockState(res);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // added because date was not showing up
    function dateFormat(dateISO) {
        const updatedDate = new Date(dateISO).toISOString().split("T")[0];
        return updatedDate;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        StockService.updateOneStock(id, stockState)
            .then((res) => {
                console.log(res);
                navigate("/ledger");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="tradeFormContainer">
            <h1>Update Trade</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                {/* Add a first column */}
                <div className="formCol">
                    {/* Date */}
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={dateFormat(stockState.date)}
                        onChange={handleChange}
                    />
                    {errors.date ? <p>{errors.date.message}</p> : <p> </p>}
                    {/* Shares */}
                    <label htmlFor="shares">Shares</label>
                    <input
                        type="number"
                        name="shares"
                        id="shares"
                        value={stockState.shares}
                        onChange={handleChange}
                    />
                    {formErrors.shares ? <p>{formErrors.shares}</p> : <p> </p>}
                    {errors.shares && <p>{errors.shares.message}</p>}
                    {/* Shaper */}
                    <label htmlFor="shaper">Shaper</label>
                    <select
                        name="shaper"
                        id="shaper"
                        value={stockState.shaper}
                        onChange={handleChange}>
                        <option value="">Pick One</option>
                        <option value="Cup w/ Handle">Cup w/ Handle</option>
                        <option value="Cup no Handle">Cup no Handle</option>
                        <option value="Coil">Coil</option>
                        <option value="Cup no Handle">Flat Base</option>
                        <option value="High Tight Flag">High Tight Flag</option>
                        <option value="Double Bottom">Double Bottom</option>
                        <option value="Inverse Head and Shoulders">
                            Inverse Head and Shoulders
                        </option>
                        <option value="De-risk">De-risk</option>
                        <option value="Earnings Soon">Earnings Soon</option>
                    </select>
                    {formErrors.shaper ? <p>{formErrors.shaper}</p> : <p> </p>}
                    {errors.shaper && <p>{errors.shaper.message}</p>}
                    {/* Button (  disable button if form is invalid) */}
                    <button
                        className={`${
                            validateForm() ? "confirmTrade" : "jsDisabled"
                        }`}
                        type="submit"
                        disabled={!validateForm()}>
                        Confirm Trade
                    </button>{" "}
                </div>
                {/* Add a second column*/}
                <div className="formCol">
                    {/* Buy Sell */}
                    <label htmlFor="buySell">Buy/Sell</label>
                    <select
                        name="buySell"
                        id="buySell"
                        value={stockState.buySell}
                        onChange={handleChange}>
                        <option value="none">Pick One</option>
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                    </select>
                    {formErrors.buySell ? (
                        <p>{formErrors.buySell}</p>
                    ) : (
                        <p> </p>
                    )}
                    {errors.buySell && <p>{errors.buySell.message}</p>}
                    {/* Price */}
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={stockState.price}
                        onChange={handleChange}
                    />
                    {formErrors.price ? <p>{formErrors.price}</p> : <p> </p>}
                    {errors.price && <p>{errors.price.message}</p>}
                    {/* Type */}
                    <label htmlFor="type">Type</label>
                    <select
                        name="type"
                        id="type"
                        value={stockState.type}
                        onChange={handleChange}>
                        <option value="">Pick One</option>
                        <option value="stock">Stock</option>
                        <option value="ETF">ETF</option>
                        <option value="dividend">Dividend</option>
                        <option value="foreign">Foreign Stock</option>
                    </select>
                    {formErrors.type ? <p>{formErrors.type}</p> : <p> </p>}
                    {errors.type && <p>{errors.type.message}</p>}
                </div>
                {/* Add a third column */}
                <div className="formCol">
                    {/* Ticker */}
                    <label htmlFor="ticker">Ticker</label>
                    <input
                        type="text"
                        name="ticker"
                        id="ticker"
                        value={stockState.ticker}
                        onChange={handleChange}
                    />
                    {formErrors.ticker ? <p>{formErrors.ticker}</p> : <p> </p>}
                    {errors.ticker && <p>{errors.ticker.message}</p>}

                    {stockState.buySell === "sell" ? (
                        <>
                            <label htmlFor="closeTrade">Close Trade?</label>
                            <select
                                name="closeTrade"
                                id="closeTrade"
                                value={stockState.closeTrade}
                                onChange={handleChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </>
                    ) : (
                        <></>
                    )}

                    {stockState.buySell === "buy" ? (
                        <>
                            <label htmlFor="openTrade">Open Trade?</label>
                            <select
                                name="openTrade"
                                id="openTrade"
                                value={stockState.openTrade}
                                onChange={handleChange}>
                                <option value="false">No</option>
                                <option value="true">Yes</option>
                            </select>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UpdateTrade;
