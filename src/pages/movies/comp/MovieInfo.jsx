import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const MovieInfo = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const imgURL = "https://image.tmdb.org/t/p/w1280";
  const alt_IMG = "https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2luZW1hfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";
  const navigate = useNavigate();
  const { movieId } = useParams();
  console.log(movieId);
  const moviesArray = JSON.parse(localStorage.getItem('mov')).results;
  
  const getMovieItem = (id) => {
    setLoading(true);
    const result = moviesArray.filter(item => item.id === Number(id));
    setInfo(result[0]);
    setLoading(false);
  }

  console.log(info);

  useEffect(() => {
    getMovieItem(movieId);
  }, [movieId]);

  return (
    <MovieInfoComp>
      <h2>IMDB Trending Movies</h2>
      <button onClick={() => navigate("/movies")}>
        Go back
      </button>
      <div className="info-wrapper">
        {
          !loading && info !== undefined ? (
            <>
              <div className="movieInfo-img">
                <img src={imgURL+info.poster_path} alt="" />
              </div>
            </>
          ) : (
            <div className="loadingInfo"><CircularProgress size="6rem" /></div>
          )
        }
      </div>
    </MovieInfoComp>
  )
}

export default MovieInfo

const MovieInfoComp = styled.section`
padding: 1rem;
button {
  margin: 2rem 1rem;
  display: block;
  width: 5rem;
  padding: 0.5rem 0;
  background: transparent;
  outline: none;
  border: 1px solid whitesmoke;
  color: whitesmoke;
  border-radius: 0.25rem;
  cursor: pointer;
}

.movieInfo-img {
  width: 275px;
  margin: 1rem;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 1px 1px 5px rgb(117, 112, 112);
  img {
    max-width: 100%;
    height: 100%;
  }
}

.loadingInfo {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;