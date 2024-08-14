import { Router } from "express";
import watchlistController from "../controllers/watchlist.controller.js";
const watchlistRouter = Router();

// Alpha Vantage Search Endpoint API

// Add to watchlist
watchlistRouter.post('/watchlist/add', watchlistController.addToWatchlist);

// Get watchlist
watchlistRouter.get('/watchlist', watchlistController.getWatchlist);

// Search stocks
watchlistRouter.route('/watchlist/search').get(watchlistController.searchStocks);

export default watchlistRouter;
