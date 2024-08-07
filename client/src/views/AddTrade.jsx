import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StockService from "../services/StockService";

const AddTrade = (props) => {
    const navigate = useNavigate()
    // Could use separate states for each, but using single state
    const [stockState, setStockState] = useState({
        ticker: "",
        price: 0,
        date: 0,
        shares: 0,
        buySell: "",
        shaper: "",
        tactical: "",
        closeTrade: "",
        openTrade: ""
    })

    const [errors, setErrors] = useState([])
    const [formErrors, setFormErrors] = useState({
        ticker: "Ticker required",
        price: "Price required",
        date: "Date required",
        shares: "Shares required",
        buySell: "Buy or Sell required",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update state with the new value
        setStockState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validation logic
        let errorMsg = "";

        if (name === "ticker") {    // Ticker validation
            if (value) {
                if (value.length < 2) {
                    errorMsg = "Ticker must be at least one letter";
                } else if (value.length > 5) {
                    errorMsg = "Ticker cannot be more than 5 letters";
                }
            } else {                // Dynamic error message
                errorMsg = "Ticker required";
            }
        } else if (name === "price") {
            if (value) {
                if (value < 0.01) {
                    errorMsg = "Price must be at least $0.01";
                } else if (value > 1000000) {
                    errorMsg = "Check again, I doubt you have a million dollars";
                }
            } else {
                errorMsg = "Price required";
            }
        } else if (name === "shares") {
            if (value) {
                if (value < 1) {
                    errorMsg = "Must be at least one share";
                }
            } else {
                errorMsg = "Shares required";
            }
        } else if (name === "buySell") {
            if (value === "none") {
                errorMsg = "Buy or Sell required";
            }
        } else if (name === "closeTrade") {

        } else if (name === "openTrade") {

        }

        // Update formErrors state
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [name]: errorMsg,
        }))
    }

    // For disabling the button
    const validateForm = () => {
        return Object.values(formErrors).every(value => value === '')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        StockService.addOneStock(stockState)
            .then(res => {
                console.log(res)
                navigate('/ledger')
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div className="tradeFormContainer">
            <h1>Add Trade</h1>
            <form className="tradeForm" onSubmit={handleSubmit}>
                {/* Add a first column */}
                <div className="formCol">
                    {/* Date */}
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        value={stockState.date}
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
                    {/* Tactical */}
                    <label htmlFor="tactical">Tactical</label>
                    <select
                        name="tactical"
                        id="tactical"
                        value={stockState.tactical}
                        onChange={handleChange}>
                        <option value="">Pick One</option>
                        <option value="Mini coil">Mini coil</option>
                        <option value="Kicker">Kicker</option>
                        <option value="Downtrend Line">Downtrend Line</option>
                        <option value="Breakout PB to 20EMA">
                            Breakout PB to 20EMA
                        </option>
                        <option value="Gap up PB to 8EMA">
                            Gap up PB to 8EMA
                        </option>
                        <option value="Pull Back to 50SMA">
                            Pull Back to 50SMA
                        </option>
                        <option value="First Touch of the 10WK SMA">
                            First Touch of the 10WK SMA
                        </option>
                        <option value="Kicker">Kickerk</option>
                        <option value="De-risking">De-risking</option>
                    </select>
                    {formErrors.tactical ? (
                        <p>{formErrors.tactical}</p>
                    ) : (
                        <p> </p>
                    )}
                    {errors.tactical && <p>{errors.tactical.message}</p>}
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
                                <option value="none">Pick One</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </>
                    ) : <></>}

                    {stockState.buySell === "buy" ? (
                        <>
                            <label htmlFor="openTrade">Open Trade?</label>
                            <select
                                name="openTrade"
                                id="openTrade"
                                value={stockState.openTrade}
                                onChange={handleChange}>
                                <option value="none">Pick One</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </>
                    ) : <></>}
                </div>
            </form>
        </div>
    );
}

export default AddTrade