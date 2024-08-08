import { useState } from "react";

const UpdateTradeHandler = () => {
    // Could use separate states for each, but using single state
    const [stockState, setStockState] = useState({
        ticker: "",
        price: 0,
        date: 0,
        shares: 0,
        buySell: "",
        shaper: "",
        type: "",
        closeTrade: false,
        openTrade: false,
    });

    // Set to nothing because the values are filled with pre-exisitng state
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update state with the new value
        setStockState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validation logic
        let errorMsg = "";

        if (name === "ticker") {
            // Ticker validation
            if (value) {
                if (value.length < 2) {
                    errorMsg = "Ticker must be at least one letter";
                } else if (value.length > 5) {
                    errorMsg = "Ticker cannot be more than 5 letters";
                }
            } else {
                // Dynamic error message
                errorMsg = "Ticker required";
            }
        } else if (name === "price") {
            if (value) {
                if (value < 0.01) {
                    errorMsg = "Price must be at least $0.01";
                } else if (value > 1000000) {
                    errorMsg =
                        "Check again, I doubt you have a million dollars";
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
        }));
    };

    return {
        handleChange,
        stockState,
        setStockState,
        formErrors,
    };
};

export default UpdateTradeHandler;
