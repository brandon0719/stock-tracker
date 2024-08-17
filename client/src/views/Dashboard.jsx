import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="card-container">
                <Link to="/watchlist" className="dashboard-card">
                    <div className="card-content">
                        <h2>Watchlist</h2>
                        <p>Manage your stock watchlist</p>
                    </div>
                </Link>
                <Link to="/current" className="dashboard-card">
                    <div className="card-content">
                        <h2>Portfolio</h2>
                        <p>View your investment portfolio</p>
                    </div>
                </Link>
                <Link to="/add" className="dashboard-card">
                    <div className="card-content">
                        <h2>Add Trade</h2>
                        <p>Add a new trade</p>
                    </div>
                </Link>
                <Link to="/ledger" className="dashboard-card">
                    <div className="card-content">
                        <h2>Ledger</h2>
                        <p>View/ Edit/ Delete trade history</p>
                    </div>
                </Link>
                <Link to="/stats" className="dashboard-card">
                    <div className="card-content">
                        <h2>Trade Statistics</h2>
                        <p>View your open positions, and closed trades statistics</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
