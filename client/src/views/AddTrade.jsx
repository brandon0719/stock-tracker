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
        tactical: ""
    })

    const [errors, setErrors] = useState([])

    const handleChange = (e) => {
        if (e.target.name === "ticker") {
            let newValue = e.target.value;
            // Spread operator to copy all properties of stockState, and then update ticker
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            // errors
        } else if (e.target.name === "price") {
            let newValue = e.target.value;
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            //errors
        } else if (e.target.name === "date") {
            let newValue = e.target.value;
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            //errors
        } else if (e.target.name === "shares") {
            let newValue = e.target.value;
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            //errors
        } else if (e.target.name === "buySell") {
            let newValue = e.target.value;
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            //errors
        } else if (e.target.name === "shaper") {
            let newValue = e.target.value;
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            //errors
        } else if (e.target.name === "tactical") {
            let newValue = e.target.value;
            setStockState((prevState) => ({
                ...prevState,
                [e.target.name]: newValue
            }));
            //errors
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        StockService.addOneStock(stockState)
            .then(res => {
                console.log(res)
                navigate('/ledger')
            })
            .catch(err => {
                console.log(err)
                setErrors(err)
            })
    }

    return (
        <div>
            <h1>Add Trade</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ticker">Ticker</label>
                <input
                    type="text"
                    name="ticker"
                    id="ticker"
                    value={stockState.ticker}
                    onChange={handleChange}
                />
                {errors.ticker && <p>{errors.ticker.message}</p>}

                <label htmlFor="price">Price</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={stockState.price}
                    onChange={handleChange}
                />
                {errors.price && <p>{errors.price.message}</p>}

                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    value={stockState.date}
                    onChange={handleChange}
                />
                {errors.date && <p>{errors.date.message}</p>}

                <label htmlFor="shares">Shares</label>
                <input
                    type="number"
                    name="shares"
                    id="shares"
                    value={stockState.shares}
                    onChange={handleChange}
                />
                {errors.shares && <p>{errors.shares.message}</p>}

                <label htmlFor="buySell">Buy/Sell</label>
                <input
                    type="text"
                    name="buySell"
                    id="buySell"
                    value={stockState.buySell}
                    onChange={handleChange}
                />
                {errors.buySell && <p>{errors.buySell.message}</p>}

                <label htmlFor="shaper">Shaper</label>
                <input
                    type="text"
                    name="shaper"
                    id="shaper"
                    value={stockState.shaper}
                    onChange={handleChange}
                />
                {errors.shaper && <p>{errors.shaper.message}</p>}

                <label htmlFor="tactical">Tactical</label>
                <input
                    type="text"
                    name="tactical"
                    id="tactical"
                    value={stockState.tactical}
                    onChange={handleChange}
                />
                {errors.tactical && <p>{errors.tactical.message}</p>}

                <button type="submit">Confirm Trade</button>
            </form>
        </div>
    );
}

export default AddTrade