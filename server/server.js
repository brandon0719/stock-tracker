// Import modules
import express from "express"; // Import Express framework (building server)
import cors from "cors"; // Import CORS module to allow (middleware)
import dotenv from "dotenv"; // Import dotenv to read environemnt variables from .env file
import dbConnect from "./config/mongoose.config.js"; // Import function to connect to DB
import router from "./routes/trade.routes.js";

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

// Start server and listen to port
const PORT = process.env.PORT;
app.listen(PORT, () => 
  console.log(`Server is running on port ${PORT}`)
);
