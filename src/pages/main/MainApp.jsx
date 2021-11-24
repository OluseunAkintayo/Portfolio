import React, { useEffect } from 'react'
import AboutMe from './components/AboutMe';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const MainApp = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  
  return (
    <>
      <Header />
      <Home />
      <AboutMe />
      <Projects />
      <Contact />
      <Footer />
    </>
  )
}

export default MainApp
