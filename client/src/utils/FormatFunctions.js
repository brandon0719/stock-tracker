// Converts a date string (ISO format) to a more readable MM/DD/YYYY format
function dateChanger(dateISO) {
    if (typeof dateISO === "string") {
        const dateObject = new Date(dateISO);
        // console.log(dateObject)
        const newDate = `${(dateObject.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0")}/${dateObject
            .getUTCDate()
            .toString()
            .padStart(2, "0")}/${dateObject.getUTCFullYear()}`;

        return newDate;
    }
    return "OPEN";
}

// Calculates the total cost based on price per share and number of shares
function totalCostFmt(price, shares) {
    const cost = price * shares;
    const formattedNumber = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cost);
    return formattedNumber;
}

// Formats a given cost as a currency string in USD format
function formattedCost(cost) {
    const formattedNumber = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cost);
    return formattedNumber;
}

// Formats a given price as a currency string in USD format
function formattedPrice(price) {
    const formattedNumber = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
    return formattedNumber;
}

// Formats a given number as a percentage string with one decimal place
function formattedPercent(num) {
    // Round the decimal to one decimal place
    let formattedNum = num.toFixed(2) + "%";

    return formattedNum;
}

export {
    dateChanger,
    totalCostFmt,
    formattedPrice,
    formattedCost,
    formattedPercent,
};
