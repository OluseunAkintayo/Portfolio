import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainApp from "./pages/main/MainApp";
import MovApp from './pages/movies/MovApp';
import MovieInfo from './pages/movies/comp/MovieInfo';
import Starwars from './pages/starwars/Starwars';
import ShipInfo from './pages/starwars/components/ShipInfo';
import Cart from './pages/starwars/components/Cart';
import Login_II from './pages/dashboard/comp/Pages/Login_II';
import MainDash from './pages/dashboard/comp/Pages/Dashboard/Main';
import Accounts from './pages/dashboard/comp/Pages/Users/Accounts';
import ProtectedRoute from './assets/utils/ProtectedRoute';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainApp} />
        {/* movies */}
        <Route path="/movies" exact component={MovApp} />
        <Route path="/movies/:movieId" exact component={MovieInfo} />
        {/* starships */}
        <Route path="/starships" exact component={Starwars} />
        <Route path="/starships/:shipName" exact component={ShipInfo} />
        <Route path="/starships/checkout" exact component={Cart} />
        {/* Dashboard */}
        <Route path="/admin/auth" exact component={Login_II} />
        <ProtectedRoute path="/admin/home" exact component={MainDash} />
        <ProtectedRoute path="/admin/users" exact component={Accounts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
