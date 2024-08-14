import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    change: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    date: { type: String, required: true },
});

const WatchlistModel = mongoose.model("Watchlist", WatchlistSchema);

export default WatchlistModel;
