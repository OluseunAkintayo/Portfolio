import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainApp from "./pages/main/MainApp";
import MovApp from './pages/movies/MovApp';
import MovieInfo from './pages/movies/comp/MovieInfo';
import Starwars from './pages/starwars/Starwars';
import ShipInfo from './pages/starwars/components/ShipInfo';
import Cart from './pages/starwars/components/Cart';
import Login_II from './pages/dashboard/comp/Pages/Login_II';
import MainDash from './pages/dashboard/comp/Pages/Dashboard/Main';
import Accounts from './pages/dashboard/comp/Pages/Users/Accounts';

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
        <Route path="/admin/auth" element={<Login_II />} />
        <Route path="/admin/home" element={<MainDash />} />
        <Route path="/admin/users" element={<Accounts />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
