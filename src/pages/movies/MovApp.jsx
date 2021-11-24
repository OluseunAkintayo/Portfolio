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
      currentPage: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  mov_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=`;
  search = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=`;

  getMovies(API) {
    this.setState((state) => { return { loading: false } });
    fetch(API)
      .then(res => res.json()).then(movies => {
        if(movies.results.length > 0) {
          localStorage.setItem('mov', JSON.stringify(movies))
          this.setState((state) => { return { movies: movies.results } });
          this.setState((state) => { return { loading: false } });
          this.setState((state) => { return { totalPages: movies.total_pages } });
          console.log(this.state)
        } else {
          console.log(movies);
        }
      })
      .catch(err => {
        console.log({err});
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.getMovies(this.mov_API + this.state.currentPage);
    // this.getMovies(this.search)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name] : value });
    // if ((this.state.searchText).trim() === '') {
    //   this.getMovies(this.mov_API)
    // } else if (this.state.searchText) {
    //   this.getMovies(this.search + this.state.searchText)
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    if ((this.state.searchText).trim() === '') {
      this.getMovies(this.mov_API)
    } else if (this.state.searchText) {
      this.getMovies(this.search + this.state.searchText + `&page=` + this.state.currentPage)
    }
  }

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
  }

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
  }

  getMovie = id => {
    const result = this.state.movies.filter(item => item.id === id)
    // console.log(result);
  }
  
  render() {
    let movArray = this.state.movies.map(movItem => <Movie movItem={movItem} key={movItem.id} getMovie={this.getMovie} />);

    let displayResults = () => {
      if(this.state.searchText) {
        return "show";
      } else {
        return "hideText";
      }
    }

    return (
      <>
        <header>
          <Link to="/movies" className="movies-header">IMDB Trending Movies</Link>
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
          { this.state.loading ? 
            (<div className="progress"><CircularProgress size="7.5rem" /></div>) :
            (
              <div className="container">
                {movArray}
              </div>
            )
          }
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