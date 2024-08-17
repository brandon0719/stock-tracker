// Import modules
import express from "express"; // Import Express framework (building server)
import cors from "cors"; // Import CORS module to allow (middleware)
import dotenv from "dotenv"; // Import dotenv to read environemnt variables from .env file
import dbConnect from "./config/mongoose.config.js"; // Import function to connect to DB
import yahooRouter from './routes/yahoo.routes.js'; // Import router for Yahoo Finance API      (controller -> router -> server)
import watchlistRouter from "./routes/watchlist.routes.js";
import router from "./routes/trade.routes.js";

// For watchlist updates  (npm installed node-cron and axios and created a service to fetch from yahoo finance)
import cron from "node-cron";
import getQuote from "./services/yahooService.js";
import watchlistModel from "./models/watchlist.model.js";

cron.schedule("* * * * *", async () => {
    // Run every minutes
    const watchlist = await watchlistModel.find();
    for (let stock of watchlist) {
        const data = await getQuote(stock.symbol);
        const name = data.chart.result[0].meta.longName;
        const price = data.chart.result[0].meta.regularMarketPrice;
        const prevClosingPrice = data.chart.result[0].meta.previousClose;
        const change = price - prevClosingPrice;
        const changePercent = (change / prevClosingPrice) * 100;
        const high = data.chart.result[0].meta.regularMarketDayHigh;
        const low = data.chart.result[0].meta.regularMarketDayLow;
        // Calculate current time
        const timestamps = data.chart.result[0].timestamp;
        const latestTimestamp = timestamps[timestamps.length - 1]; // Get the last timestamp
        const ISOdate = new Date(latestTimestamp * 1000); // Convert to Date object
        const date = ISOdate.toLocaleString("en-US", {
            timeZone: "America/New_York",
        });
        await watchlistModel.updateOne(
            { _id: stock._id },
            {
                name: name,
                price: price,
                change: changePercent,
                high: high,
                low: low,
                date: date,
            }
        );
    }
    console.log("Watchlist prices updated");
});

// Connect to database
dbConnect();

// Create instance of Express
const app = express();

// Parse JSON requests and use CORS for cross-origin requests
app.use(express.json(), cors());

// Load environment variables from .env file
dotenv.config();

// Use the router middleware to handle API routes under /api prefix
app.use('/api', router)

// yahoo finance API
app.use('/api', yahooRouter);

// alpha vantage api (watchlist)
app.use("/api", watchlistRouter);

// Start server and listen to port
const PORT = process.env.PORT;
app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`)
);
