import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainApp from "./pages/main/MainApp";
import MovApp from './pages/movies/MovApp';
import MovieInfo from './pages/movies/comp/MovieInfo';
import Starwars from './pages/starwars/Starwars';
import ShipInfo from './pages/starwars/components/ShipInfo';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="projects/movies" element={<MovApp />} />
        <Route path="/movies/movie/id/:movieId" element={<MovieInfo />} />
        <Route path="/projects/starwars" element={<Starwars />} />
        <Route path="projects/ships/:shiptId" element={<ShipInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
