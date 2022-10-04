import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from 'react-router-dom';
import sterling from '../../../assets/sterling.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import { Grid } from '@mui/material';
import { DescriptionOutlined } from '@mui/icons-material';
// import movie from "../../../assets/movie.jpg";
// import globe from '../../../assets/globe.png';

const ProjectsComp = styled.section`
background: rgb(10, 14, 23);
color: whitesmoke;
padding: 1rem;

.projects-container {
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: 0 auto;
  h2 {
    text-align: center;
    margin: 2rem auto;
  }
}

@media(max-width: 600px) {
  padding-top: 3rem;
}
`;
const Container = styled.div`
`;
const PortfolioItem = styled(motion.div)`
  height: 360px;
  border: 1px solid #FFFFFF;
  border-radius: 0.5rem;
  a {
    display: block;
    height: 100%;
    padding: 1rem;
    &:hover {
      background: rgba(245, 245, 245, 0.05); 
    }
  }
`;
const ImgContainer = styled.div`
  height: 60%;
  display: grid;
  place-items: center;
`;
const Img = styled.img`
  height: 85%;
`;
const Description = styled.div`
  height: 40%;
  display: flex;
  gap: 0.375rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Title = styled.h4`
  align-self: center;
  font-size: 1.25rem;
  font-weight: 500;
`;
const Details = styled.p`
  width: 100%;
  text-align: center;
  font-weight: ${props => props.weight};
  margin-top: ${props => props.mt};
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
`;

const Projects = () => {

  const control = useAnimation();
  const [boxRef, boxInView] = useInView({
    rootMargin: '-50px 0px'
  })

  const hoverEffect = {
    whileHover: { scale: 1.025, color: 'rgb(255, 255, 255, 0.5)' }
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
        <Container>
          <Grid container rowSpacing={4} columnSpacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <PortfolioItem variants={childVariant} {...hoverEffect}>
                <a href="https://shop.techydna.com" target="_blank">
                  <ImgContainer>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: '12.5rem' }} />
                  </ImgContainer>
                  <Description>
                    <Title>The Shop</Title>
                    <Details>The one-stop shop</Details>
                    <Details weight="300">Made with React JS, Styled-components, Material UI</Details>
                  </Description>
                </a>
              </PortfolioItem>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PortfolioItem variants={childVariant} {...hoverEffect}>
                <a href="https://meme-sterling.web.app/" target="_blank" rel="noreferrer">
                  <ImgContainer>
                    <Img src={sterling} alt="sterling" />
                  </ImgContainer>
                  <Description>
                    <Title>Meme Generator</Title>
                    <Details>Make memes with your photos in a few steps</Details>
                    <Details weight="300">Made with React JS, Tailwind CSS, Material UI</Details>
                  </Description>
                </a>
              </PortfolioItem>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PortfolioItem variants={childVariant} {...hoverEffect}>
                <Link to='/movies'>
                  <ImgContainer>
                    <SlideshowIcon sx={{ fontSize: '12.5rem' }} />
                  </ImgContainer>
                  <Description>
                    <Title>Movies App</Title>
                    <Details>Search for trending and top-rated movies</Details>
                    <Details weight="300" mt="0.5rem">Made with React JS, Styled-components</Details>
                  </Description>
                </Link>
              </PortfolioItem>
            </Grid>
          </Grid>
        </Container>
      </motion.div>
    </ProjectsComp>
  )
}

export default Projects;