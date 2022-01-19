import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Movie from './comp/Movie';
import Footer from './comp/Footer';
import './comp/style.css'
import { CircularProgress } from '@material-ui/core';

class MovApp extends Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      searchText: '',
      loading: false,
      totalPages: null,
      currentPage: 1,
      error: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mov_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
  search = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`;

  getMovies(API) {
    this.setState((state) => { 
      return { ...state, loading: true }
     });
    fetch(API)
      .then(res => res.json()).then(movies => {
        if(movies.results.length > 0) {
          localStorage.setItem('mov', JSON.stringify(movies))
          this.setState((state) => { 
            return {
              ...state,
              movies: movies.results,
              totalPages: movies.total_pages,
              loading: false
            }
          });
        }
      }).catch(err => {
        console.log({err});
        this.setState((state) => { 
          return {
            totalPages: 1,
            error: 'Unable to fetch movies. Please check your network and try again.',
            loading: false
          } 
        });
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getMovies(this.mov_API + this.state.currentPage);
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name] : value });
  };

  handleSubmit(e) {
    e.preventDefault();
    if ((this.state.searchText).trim() === '') {
      this.getMovies(this.mov_API)
    } else if (this.state.searchText) {
      this.getMovies(this.search + this.state.searchText + `&page=` + this.state.currentPage)
    }
  };

  prevPage = () => {
    if(this.state.currentPage > 1) {
      if(this.state.searchText) {
        this.setState((state) => {
          return { ...state, currentPage: this.state.currentPage - 1 }
        }, ()  => this.getMovies(this.search + this.state.searchText + `&page=` + this.state.currentPage))
      } else {
        this.setState((state) => {
          return { ...state, currentPage: this.state.currentPage - 1 }
        }, ()  => this.getMovies(this.mov_API + this.state.currentPage))
      }
      
    } else if(this.state.currentPage === 1) {
      if(this.state.searchText) {
        return this.state.currentPage;
      } else {
        return this.state.currentPage;
      }
    }
  };

  nextPage = () => {
    if(this.state.currentPage < this.state.totalPages) {
      if(this.state.searchText) {
        this.setState((state) => {
          return { ...state, currentPage: this.state.currentPage + 1 }
        }, ()  => {
          this.getMovies(this.search + this.state.searchText + `&page=` + this.state.currentPage);
          window.scrollTo(0, 0);
        })
      } else {
        this.setState((state) => {
          return { ...state, currentPage: this.state.currentPage + 1 }
        }, ()  => {
          this.getMovies(this.mov_API + this.state.currentPage);
          window.scrollTo(0, 0);
        })
      }
      
    } else  {
      return this.state.currentPage;
    }
  };

  getMovie = id => {
    const result = this.state.movies.filter(item => item.id === id)
  };
  
  render() {
    let movArray = this.state.movies.map(movItem => <Movie movItem={movItem} key={movItem.id} getMovie={this.getMovie} />);

    let displayResults = () => {
      if(this.state.searchText) {
        return "show";
      } else {
        return "hideText";
      }
    }
    const showMovies = () => {
      if (this.state.loading) {
        return <div className="progress"><CircularProgress size="5rem" /></div>
      } else {
        return <div className="container">{movArray}</div>
      }
    }

    return (
      <>
        <header>
          <Link to="/movies" className="movies-header"><h3>IMDB Movies</h3></Link>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="searchText"
              value={this.state.searchText}
              onChange={this.handleChange}
              placeholder="Search..."
            />
          </form>
        </header>
        <div className="mov-wrapper">
          <div className={displayResults()}>
            Showing results for {`"${this.state.searchText}"`}
          </div>
          { showMovies() }
          <div className="paginate">
            <p>Page {this.state.currentPage} of {this.state.totalPages}</p>
            <div className="paginate-btns">
              <button onClick={this.prevPage}>Prev</button>
              <button onClick={this.nextPage}>Next</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default MovApp;