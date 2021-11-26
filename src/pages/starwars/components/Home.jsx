import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Ship from './Ship';
import { CircularProgress } from '@mui/material';

const Home = () => {
  const [ships, setShips] = useState(null);
  const [newShips, setNewShips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const shipURL = `https://swapi.dev/api/starships/?page=1`;
  const getShips = (URL) => {
    setLoading(false);
    fetch(URL).then(res => res.json().then(data => {
      console.log(data);
      setShips(data);
      setLoading(false);    
    }))
    .catch(err => console.log({err}));
  }

  const getShip = (name) => {
    const result = ships.find(ship => ship.name === name);
    return result;
  }

  const addToCart = name => {
    const items = [...ships];
    const item = getShip(name);
    const index = items.indexOf(item);
    item.inCart = true;
    item.itemCount = 1;
    item.itemTotal = Number(item.cost_in_credits);
    setCartCount(cartCount + 1);
    console.log(item);
  }

  const renderShips = () => {
    if(loading || ships === null || ships === undefined) {
      return <div className="loadingShips"><CircularProgress size="5rem" /></div>
    } else if(!loading && ships !== undefined) {
      const result = ships.results.map((ship, index) => ({ ...ship, inCart: false, itemCount: 0, itemTotal: 0, imgUrl }));
      return result.map(item => <Ship key={item.index} ship={item} addToCart={addToCart} />)
    }
  }

  useEffect(() => {
    getShips(shipURL);
  }, []);

  return (
    <HomeComp>
      <Navbar cartCount={cartCount} />
      <div className="container">
        { renderShips() }
      </div>
      <div className="paginate">
        Page 
      </div>
    </HomeComp>
  )
}

export default Home

const HomeComp = styled.div`
.loadingShips {
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;