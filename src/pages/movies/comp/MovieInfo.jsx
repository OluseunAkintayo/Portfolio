import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const MovieInfo = () => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState([]);
  const imgURL = "https://image.tmdb.org/t/p/w1280";
  const alt_IMG = "https://images.unsplash.com/photo-1559570278-eb8d71d06403?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2luZW1hfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80";
  const navigate = useNavigate();
  const { movieId } = useParams();
  const moviesArray = JSON.parse(localStorage.getItem('mov')).results;
  
  const getMovieItem = (id) => {
    setLoading(true);
    const result = moviesArray.find(item => item.id === Number(id));
    console.log(result)
    setInfo(result);
    setLoading(false);
  }


  const bg = {
    background: `linear-gradient( 45deg, rgba(17,24,39, 0.93), rgba(13, 13, 17, 0.93) ), url('${imgURL + info.backdrop_path}')`,
  }

  useEffect(() => {
    getMovieItem(movieId);
  }, [movieId]);

  

  return (
    <MovieInfoComp style={info !== undefined && !loading ? bg : null}>
      <h2 className="main-title">Movie Details</h2>
      <button onClick={() => navigate("/movies")}>
        <ArrowBack className="arrowIcon" />
      </button>
      <div className="info-wrapper">
        {
          !loading && info !== undefined ? (
            <>
              <h2 className="sm-title">{info.title}</h2>
              <div className="movieInfo-img">
                <img src={imgURL+info.poster_path} alt="" />
              </div>
              <div className="movieInfo-details">
                <h2 className="lg-title">{info.title}</h2>
                <h3>Synopsis</h3>
                <p>{info.overview}</p>
                <p className="release-date">Release date: {info.release_date}</p>
                <span>Movie average rating: {info.vote_average}</span><br />
                <span>Number of votes: {info.vote_count}</span>
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

export default MovieInfo;

const MovieInfoComp = styled.section`
padding: 1rem;
height: 100vh;
overflow-y: auto;
background-size: cover;
background-attachment-fixed;
background-position: center;
background-repeat: no-repeat;

.info-wrapper {
  margin: 1rem;
  display: flex;
  justify-content: center;

  .sm-title {
    display: none;
  }

  .movieInfo-details {
    max-width: 500px;
    margin: 1rem;
    h2 {
      font-size: 1.75rem;
      letter-spacing: 0.5px;
      margin-bottom: 0.75rem;
    }
    span {
      margin: 0.5rem 0;
      display: inline-block;
    }
    h3 {
      letter-spacing: 0.5px;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }
    p {
      line-height: 1.75rem;
    }
    .release-date {
      margin-top: 1rem;
    }
  }
}

button {
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  padding: 0.25rem 0;
  background: transparent;
  outline: none;
  border: 1px solid rgba(245, 245, 245, 0.4);
  color: whitesmoke;
  border-radius: 0.2rem;
  cursor: pointer;
  .arrowIcon {
    font-size: 1.5rem;
  }
  transition: ease-in-out 0.5s;
  &:hover {
    background: rgba(245, 245, 245, 0.1);
    border: transparent;
  }
}

.movieInfo-img {
  max-width: 275px;
  min-width: 250px;
  max-height: 416px;
  margin: 1rem;
  border-radius: 0.25rem;
  overflow: hidden;
  box-shadow: 1px 1px 5px rgb(117, 112, 112);
  img {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
  }
}

.loadingInfo {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 600px) {
  .info-wrapper {
    flex-direction: column;
    align-items: center;

    .sm-title {
      display: block;
      text-align: center;
    }

    .lg-title {
      display: none;
    }
  }
}

@media (max-width: 340px) {
  button {
    margin-left: 0;
  }
  .info-wrapper {
    width: calc(100vw - 2rem);
    margin: 0;
  }
  .movieInfo-details {
    margin: 0;
    width: 100%;
  }

  }
  .movieInfo-img {
    width: 90vw;
    img {
      width: 100%;
    }
  }
  .main-title {
    text-align: center;
  }
  .sm-title {
    margin-bottom: 1.5rem;
  }  
}
`;
