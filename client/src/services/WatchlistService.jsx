import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:8000/api",
});

function addToWatchlist(stock) {
    return http
        .post("/watchlist/add", stock)
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

// Add other methods for interacting with the watchlist as needed
function getWatchlist() {
    return http
        .get("/watchlist")
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

function searchStocks(keywords) {
    return http
        .get(`/watchlist/search`, { params: { keywords } })
        .then((res) => res.data)
        .catch((err) => {
            throw err;
        });
}

const WatchlistService = {
    addToWatchlist: addToWatchlist,
    getWatchlist: getWatchlist,
    searchStocks: searchStocks,
};
export default WatchlistService;
