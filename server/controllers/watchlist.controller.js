import watchlistModel from "../models/watchlist.model.js";

// FOR API KEY
import dotenv from "dotenv"; // Import dotenv to read environemnt variables from .env file
dotenv.config();
const API_KEY = process.env.ALPHAVANTAGE_API_KEY; // Get the API key from the environment variables

// FOR FETCHING DATA
const searchStocks = async (req, res) => {
    try {
        const { keywords } = req.query;
        const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(
            keywords
        )}&apikey=${API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        const matches = data.bestMatches.map((match) => ({
            symbol: match["1. symbol"],
            name: match["2. name"],
        }));

        res.json(matches);
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch data from Alpha Vantage",
        });
    }
};

const addToWatchlist = async (req, res) => {
    try {
        const newStock = await watchlistModel.create(req.body);
        const stock = await newStock.save();
        res.json(newStock);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to add stock to watchlist" });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const watchlist = await watchlistModel.find();
        res.json(watchlist);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch watchlist" });
    }
};

const watchlistController = {
    searchStocks: searchStocks,
    addToWatchlist: addToWatchlist,
    getWatchlist: getWatchlist,
};

export default watchlistController;
