import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import Navbar from './Navbar';
import Ship from './Ship';
import { vessels } from '../data/data';
import { getAllShips } from '../../../redux/actions';
import { CircularProgress } from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import { Search } from '@mui/icons-material';
import Footer from './Footer';
import saveScrollPosition from '../../../assets/utils/utils';

const Home = ({ getShips, spaceShips }) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(2);
  const [search, setSearch] = useState('');
  const [i, setI] = useState(0);
  const [n, setN] = useState(18);

  const getItems = (items) => {
    setLoading(true);
    let temp = [];
    items.forEach(item => {
      const unit = {
        ...item,
        id: uuidV4(),
        itemCount: 0,
        itemTotal: 0,
        price: item.cost_in_credits === "unknown" ? Math.ceil(Math.random() * 48954782) : Number(item.cost_in_credits)
      };
      temp = [...temp, unit];
    })
    getShips(temp);
    setLoading(false);
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
    getItems(vessels);
  }, []);

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(spaceShips));
  }, [spaceShips]);

  const options = {
    // includeMatches: false,
    includeScore: true,
    keys: ["name"],
  }

  const fuse = new Fuse(vessels, options);

  const nextPage = () => {
    if(currentPage < 2 && pages > 1) {
      setCurrentPage(currentPage + 1)
      setI(18);
      setN(39);
      window.scrollTo(0,0);
    }
  }

  const prevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setI(0);
      setN(18);
      window.scrollTo(0,0);
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
    if(e.target.value.trim() === '') {
      getItems(vessels);
      setPages(2);
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    if(search.trim() !== '') {
      setCurrentPage(1);
      let res = fuse.search(search);
      res = res.map(item => item.item);
      console.log(res);
      getItems(res);
      if(res.length < 18) { setPages(1); setCurrentPage(1) }
    } else {
      getItems(vessels);
    }
  }

  return (
    <>
    <HomeComp>
      <Navbar />
      <div className="form-container">
        <form className="search" onSubmit={onSearch}>
          <input type="text" placeholder="Search Ship..."
            name="search"
            value={search}
            onChange={handleChange}
          />
          <Search className="search-icon" onClick={onSearch} />
        </form>
      </div>
      <h3 className="intro-header">Choose a ship for your next space adventure!</h3>
      <div className="container">
        { loading || spaceShips === undefined || spaceShips === null ? 
          (<div className="loadingShips"><CircularProgress size="5rem" /></div>) : 
          <>
            { spaceShips.sort((a,b) => a.name.localeCompare(b.name)).slice(i, n).map(ship => <Ship key={ship.id} ship={ship} />) }
          </>
        }
      </div>
      <div className="paginate">
        <p>Page {currentPage} of {pages}</p>
        <button onClick={prevPage} className="navigation">Prev</button>
        <button onClick={nextPage} className="navigation">Next</button>
      </div>
    </HomeComp>
    <Footer />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getShips: (items) => dispatch(getAllShips(items)),
  }
}

const mapStateToProps = state => {
  return {
    spaceShips: state.store.ships,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

const HomeComp = styled.div`
padding-top: 5rem;

.form-container {
  margin: 1rem;
}

.intro-header {
  margin 2rem 1rem;
  text-align: center;
}

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