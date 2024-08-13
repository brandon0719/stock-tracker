import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navRow"> {/* This is the parent div and FLEX ROW*/}
            <div className="navTitle">
                <Link className="dashLink" to="/">
                    Trading
                </Link>
                <Link className="dashLink" to="/">
                    Tracker
                </Link>
            </div>
            <div className="navLinks">
                <Link className="dashLink" to="/current">
                    Portfolio
                </Link>
                <Link className="dashLink" to="/add">
                    Add Trade
                </Link>
                <Link className="dashLink" to="/ledger">
                    Ledger
                </Link>
                <Link className="dashLink" to="/stats">
                    Statistics
                </Link>
                <Link className="dashLink" to="/watchlist">
                    Watchlist
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
