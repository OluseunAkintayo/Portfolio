import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainApp from "./pages/main/MainApp";
import MovApp from './pages/movies/MovApp';
import MovieInfo from './pages/movies/comp/MovieInfo';
import Login_II from './pages/dashboard/comp/Pages/Login_II';
import MainDash from './pages/dashboard/comp/Pages/Dashboard/MainDash';
import Accounts from './pages/dashboard/comp/Pages/Users/Accounts';
import Brands from './pages/dashboard/comp/Pages/Products/Brands';
import Inventory from './pages/dashboard/comp/Pages/Products/Inventory';
import Products from './pages/dashboard/comp/Pages/Products/Products';
import ProtectedRoute from './assets/utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainApp} />
        {/* movies */}
        <Route path="/movies" exact component={MovApp} />
        <Route path="/movies/:movieId" exact component={MovieInfo} />
        {/* Dashboard */}
        <Route path="/admin/auth" exact component={Login_II} />
        <ProtectedRoute path="/admin/home" exact component={MainDash} />
        <ProtectedRoute path="/admin/users" exact component={Accounts} />
        <ProtectedRoute path="/admin/products/brands" exact component={Brands} />
        <ProtectedRoute path="/admin/products/main" exact component={Accounts} />
        <ProtectedRoute path="/admin/products/inventory" exact component={Accounts} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
