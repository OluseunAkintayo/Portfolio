import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowUpward } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const Home = () => {

  const backTop = () => {
    window.scrollTo(0, 0);
  }

  const hoverEffect = {
    whileHover: { scale: 1.1, color: 'rgba(245, 245, 245, 0.9)' },
    whileTap: { scale: 0.9 }
  }

  return (
    <>
      <HomeSection id="home">
        <div className="home-main">
          <motion.h3
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          >
            Hello! I am...
          </motion.h3>
          <motion.h1
            className="name"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { duration: 3, type: 'spring', stiffness: 150, damping: 12 }}}
          >
            Oluseun Oladiipo
          </motion.h1>
          <motion.h3 className="role"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          >Frontend Developer</motion.h3>
          <motion.h5 className="stack"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          >HTML | CSS | Tailwind | JavaScript | React JS</motion.h5>
          <motion.a
            href="#about" className="about-link"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          >More Info</motion.a>
        </div>
        <Tooltip title="Back to top" onClick={backTop}>
          <motion.div className="backToTop" {...hoverEffect}>
            <ArrowUpward />
          </motion.div>
        </Tooltip>
      </HomeSection>
    </>
  )
}

export default Home

const HomeSection = styled.section`
.backToTop {
  background-color: gray;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: fixed;
  z-index: 10;
  bottom: 1rem;
  right: 1rem;
  cursor: pointer;
}
background: linear-gradient( 45deg, rgba(17,24,39, 0.9), rgba(13, 13, 17, 0.9) ), url('https://media.istockphoto.com/photos/computer-programmer-working-on-laptop-picture-id1265176772?b=1&k=20&m=1265176772&s=170667a&w=0&h=IHFnvxa3kvVTuZcEfPpCSGIFA_gNT7dIlGDR7eD2cFI=');
background-size: cover;
background-repeat: no-repeat;
height: calc(100vh - 3rem);
width: 100%;
display: flex;
align-items: center;
justify-content: center;
padding: 1rem;

.home-main {
  color: whitesmoke;
  letter-spacing: 1.5px;
  text-align: center;
  padding: 1rem;
  h3 {
    margin-bottom: 1rem;
  }
}

.name {
  padding: 1.5rem 3rem;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  margin: 0.75rem auto;
  font-size: 2rem;
}

.role {
  margin: 2rem 0 0.5rem 0;
}

.stack {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.about-link {
  display: block;
  border: 1px solid white;
  max-width: 10rem;
  margin: 2rem auto;
  padding: 0.625rem 0.25rem;
  border-radius: 0.25rem;
  transition: 0.2s ease-in-out;
  &:hover {
    background: whitesmoke;
    color: darkslategray;
    border: 1px solid darkslategray;
    font-weight: bold;
  }
}

@media (max-width: 600px) {
  height: 100vh;
  padding-top: 3rem;
}

`;
