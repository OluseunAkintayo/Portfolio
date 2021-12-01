import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Ship from './Ship';
import { getAllShips, addToCart } from '../../../redux/actions';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';
import { Search } from '@mui/icons-material';

const Home = ({ addToCart }) => {
  const dispatch = useDispatch();
  const shipURL = `https://swapi.dev/api/starships/?page=1`;
  const [loading, setLoading] = useState(false);
  let [ships, setShips] = useState(null);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const getItems = async (URL) => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      const tempShips = response.data.results.map((item, index) => ({
        ...item, id: uuidV4(), inCart: false, itemCount: 0, itemTotal: 0
      }));
      setShips(tempShips);
      setPages(Math.ceil(response.data.count / 10))
      dispatch(getAllShips(tempShips));
      setNext(response.data.next);
      setPrev(response.data.previous);
      setLoading(false);
    } catch (err) {
      console.error({err});
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getItems(shipURL);
  }, []);

  const nextPage = () => {
    if (next !== null) {
      getItems(next);
      setCurrentPage(currentPage + 1)
    } else {
      return null
    }
  }

  const prevPage = () => {
    if (prev !== null) {
      getItems(prev);
      setCurrentPage(currentPage - 1)
    } else {
      return null
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    const searchURL = `https://swapi.dev/api/starships/?search=`;
    if(search && search.trim() !== '') {
      getItems(searchURL + search)
    } else {
      return getItems(shipURL);
    }
  }

  return (
    <HomeComp>
      <Navbar />
      <form className="search" onSubmit={onSearch}>
        <input type="text" placeholder="Search Ship..."
          name="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Search className="search-icon" onClick={onSearch} />
      </form>
      <div className="container">
        { loading || ships === undefined || ships === null ? 
          (<div className="loadingShips"><CircularProgress size="5rem" /></div>) : 
          <>
            { ships.map(ship => <Ship key={ship.id} ship={ship} />) }
          </>
        }
      </div>
      <div className="paginate">
        <p>Page {currentPage} of {pages}</p>
        <button onClick={prevPage} className="navigation">Prev</button>
        <button onClick={nextPage} className="navigation">Next</button>
      </div>
    </HomeComp>
  )
}

export default Home;

const HomeComp = styled.div`
padding-top: 5rem;

.search {
  background: transparent;
  height: 2.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  margin: 1rem auto;
  padding: 0 0.5rem;
  border: 1px solid rgba(245, 245, 245, 0.5);
  border-radius: 0.25rem;
  overflow: hidden;
  input {
    background: transparent;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    color: whitesmoke;
    letter-spacing: 0.5px;
  }
  .search-icon {
    cursor: pointer;
  }
}

.loadingShips {
  height: 35vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigation {
  background: transparent;
  border: slategray 1px solid;
  outline: none;
  margin: 1rem 0.5rem;
  height: 2rem;
  width: 5rem;
  color: whitesmoke;
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    background: rgb(20, 24, 53);
  }
}
`;