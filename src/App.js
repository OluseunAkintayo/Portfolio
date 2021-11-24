import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainApp from "./pages/main/MainApp";
import MovApp from './pages/movies/MovApp';
import MovieInfo from './pages/movies/comp/MovieInfo';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/movies" element={<MovApp />} />
        <Route path="/movies/movie/id/:movieId" element={<MovieInfo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
