# Stock Tracker Application

## Features

- **Real-Time Stock Tracking**: Get up-to-the-minute data on stock prices, changes, highs, lows, and more.
- **Watchlist Management**: Easily add stocks to your watchlist for quick access and monitoring.
- **Search Functionality**: Search for stocks by symbol or name using the Alpha Vantage API.
- **Portfolio Tracking**: View your Open P&L, net account value, and raw amount invested.
- **Trade Ledger**: Keep a history of trades, view statistics for closed trades, and track open trades.
- **Responsive Design**: Built with a user-friendly interface that adapts to different screen sizes.
- **Automatic Updates**: Prices are updated automatically every 5 minutes, ensuring that your data is always current. (Limited by the API)

## Technologies Used

- **Frontend**:
  - React
  - HTML & CSS
  - JavaScript
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **APIs**:
  - Yahoo Finance API (for real-time stock data)
  - Alpha Vantage API (for stock search functionality)
- **Tools**:
  - Axios for HTTP requests
  - Mongoose for MongoDB interactions
  - Node-Cron for scheduled tasks

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/brandon0719/stock-tracker.git
   ```
2. Navigate to the project directory:
   ```bash
   cd stock-tracker
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB URI and API keys:
     ```
     MONGODB_URI=your_mongodb_uri
     ALPHAVANTAGE_API_KEY=your_alpha_vantage_api_key
     ```

5. Start the server:
   ```bash
   npm start
   ```
6. Open your browser and navigate to `http://localhost:8000` to start using the app.

## Usage

- **Search for Stocks**: Use the search bar to find stocks by symbol or name. Click the search icon or press "Enter" to add the stock to your watchlist.
- **Monitor Your Watchlist**: View the latest stock data, including price changes, highs, lows, and updated times. The data is refreshed automatically every 5 minutes.
- **Track Your Portfolio**: Monitor your Open P&L, net account value, and raw amount invested in real-time.
- **Manage Your Trades**: Keep a record of all trades, analyze statistics for closed trades, and monitor open trades.

## Project Structure

```
├── client               # React frontend
│   ├── src
│   └── public
├── server               # Node.js backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   └── config
├── .env.example         # Example environment file
├── README.md
├── package.json
└── server.js            # Entry point for the backend server
```

## Live Demo
[![Watch the video](https://img.youtube.com/vi/aFVVvgHG88M/maxresdefault.jpg)](https://www.youtube.com/watch?v=aFVVvgHG88M)
