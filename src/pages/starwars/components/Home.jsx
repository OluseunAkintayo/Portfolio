import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Ship from './Ship';

const Home = () => {
  const [ships, setShips] = useState(null);
  const [loading, setLoading] = useState(false);

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

  console.log(ships)

  const nextPage = () => {

  }

  useEffect(() => {
    getShips(shipURL);
  }, []);

  return (
    <HomeComp>
      <Navbar />
      {/* { ships !== null && ships.result.map(ship => <Ship ship={ships.results} />) } */}
    </HomeComp>
  )
}

export default Home

const HomeComp = styled.div`

`;