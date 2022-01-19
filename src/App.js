import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainApp from "./pages/main/MainApp";
import MovApp from './pages/movies/MovApp';
import MovieInfo from './pages/movies/comp/MovieInfo';
import Starwars from './pages/starwars/Starwars';
import ShipInfo from './pages/starwars/components/ShipInfo';
import Cart from './pages/starwars/components/Cart';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/dashboard/comp/Login';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        {/* movies */}
        <Route path="/movies" element={<MovApp />} />
        <Route path="/movies/:movieId" element={<MovieInfo />} />
        {/* starships */}
        <Route path="/starships" element={<Starwars />} />
        <Route path="/starships/:shipName" element={<ShipInfo />} />
        <Route path="/starships/checkout" element={<Cart />} />
        {/* Dashboard */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
