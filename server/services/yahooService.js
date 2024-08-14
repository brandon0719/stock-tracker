import axios from "axios";

const getQuote = async (symbol) => {
    const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    );
    return response.data;
};

export default getQuote;
