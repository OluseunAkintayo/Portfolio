import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import sterling from '../../../assets/sterling.png';
import movie from "../../../assets/movie.jpg";
import stardestroyer from '../../../assets/stardestroyer.jpg';
import globe from '../../../assets/globe.png';

const Projects = () => {

  const control = useAnimation();
  const [boxRef, boxInView] = useInView({
    rootMargin: '-50px 0px'
  })

  const hoverEffect = {
    whileHover: { scale: 1.05, color: 'rgb(59, 194, 149)' }
  }

  const boxVariant = {
    hidden: {
      x: '-50vw', opacity: 0
    },
    visible: {
      x: 0, opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2
      }
    }
  }

  const childVariant = {
    hidden: {
      opacity: 0,
      y: -40
    },
    visible: {
      y: 0,
      opacity: 1,
    }
  }

  useEffect(() => {
    if(boxInView) { control.start('visible') }
    if (!boxInView) { control.start('hidden') }
  }, [control, {boxRef, boxInView}]);

  return (
    <ProjectsComp id="portfolio">
      <motion.div variants={boxVariant} ref={boxRef} animate={control} initial="hidden" className="projects-container">
        <h2>Projects</h2>
        <div className="projects">
          <motion.div variants={childVariant} {...hoverEffect}>
            <a href="https://sterling.ng/meme" target="_blank" rel="noreferrer">
              <div className="item-img">
                <img src={sterling} alt="sterling" />
              </div>
              <div className="item-desc">
                <div className="item-name">
                  Sterling Meme Generator
                </div>
                <div className="item-stack">
                  React JS | Tailwind CSS | Material UI
                </div>
              </div>
            </a>
          </motion.div>
          <motion.div variants={childVariant} {...hoverEffect}>
            <Link to='/movies'>
              <div className="item-img">
                <img src={movie} alt="movies" />
              </div>
              <div className="item-desc">
                <div className="item-name">
                  Movies Search App
                </div>
                <div className="item-stack">
                  React JS
                </div>
              </div>
            </Link>
          </motion.div>
          <motion.div variants={childVariant} {...hoverEffect}>
            <a href="https://starwars.techydna.com" target="_blank" rel="noreferrer">
              <div className="item-img">
                <img src={stardestroyer} alt="sterling" />
              </div>
              <div className="item-desc">
                <div className="item-name">
                  Star Wars-Themed Cart
                </div>
                <div className="item-stack">
                  React JS
                </div>
              </div>
            </a>
          </motion.div>
          <motion.div variants={childVariant} {...hoverEffect}>
            <Link to='/'>
              <div className="item-img">
                <img src={globe} alt="sterling" />
              </div>
              <div className="item-desc">
                <div className="item-name">
                  Where in the world?
                </div>
                <div className="item-stack">
                  React JS | Tailwind CSS | Material UI (Coming Soon)
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </ProjectsComp>
  )
}

export default Projects

const ProjectsComp = styled.section`
background: rgb(10, 14, 23);
color: whitesmoke;

.projects-container {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: 0 auto;
  padding: 0.5rem;
  h2 {
    text-align: center;
    margin: 2rem auto;
  }
}

.projects {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1rem;


  a {
    height: 15rem;
    width: 15rem;
    border: 1px solid rgba(245, 245, 245, 0.3);
    border-radius: 0.25rem;
    overflow: hidden;
    margin: 1rem;
    padding: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ease-in-out 0.5s;
    &:hover {
      background: rgba(245, 245, 245, 0.1);
      border: transparent;
    }

    .item-img {
      height: 60%;
      text-align: center;
      margin-bottom: 1rem;
      img {
        border-radius: 50%;
        max-height: 100%;
        aspect-ratio: 1;
      }
    }

    .item-desc {
      text-align: center;
      line-height: 1.5rem;
      letter-spacing: 0.7px;
      .item-stack {
        font-size: 0.7rem;
      }
    }
  }
}

@media(max-width: 600px) {
  padding-top: 3rem;
}
`;