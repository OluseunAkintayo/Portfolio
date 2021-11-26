import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Ship from './Ship';
import { CircularProgress } from '@mui/material';

const Home = () => {
  let [ships, setShips] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inCart, setIncart] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  const shipURL = `https://swapi.dev/api/starships/?page=1`;
  const getShips = (URL) => {
    setLoading(false);
    fetch(URL).then(res => res.json().then(data => {
      // console.log(data);
      setShips(data);
      setLoading(false);    
    }))
    .catch(err => console.log({err}));
  }

  const nextPage = () => {

  }

  const renderShips = () => {
    if(loading || ships === null || ships === undefined) {
      return <div className="loadingShips"><CircularProgress size="5rem" /></div>
    } else if(!loading && ships !== undefined) {
      ships = ships.results.map(ship => ({ ...ship, inCart, imgUrl }));
      return ships.map(item => <Ship ship={item} setIncart={setIncart} setImgUrl={setImgUrl} />)
    }
  }

  useEffect(() => {
    getShips(shipURL);
  }, []);

  return (
    <HomeComp>
      <Navbar />
      { renderShips() }
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