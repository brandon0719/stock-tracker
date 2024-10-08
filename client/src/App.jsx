import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './views/Dashboard'
import AddTrade from './views/AddTrade'
import ShowAllTrades from './views/ShowAllTrades'
import CurrentPortfolio from './views/CurrentPortfolio'
import Watchlist from './views/Watchlist'
import TradeLedger from './views/TradeLedger'
import TradeStats from './views/TradeStats'
import UpdateTrade from './views/UpdateTrade'
import Navbar from './components/Navbar'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTrade />} />
          <Route path="/current" element={<CurrentPortfolio />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/ledger" element={<TradeLedger />} />
          <Route path="/stats" element={<TradeStats/>} />
          <Route path="/update/:id" element={<UpdateTrade />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
