import { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { MenuOpen } from '@material-ui/icons';
import logo from '../../../assets/logo-white.svg';

function Header() {
  const [sidebar, setSidebar] = useState('');
  const toggleSidebar = () => {
    sidebar === '' ? setSidebar('show') : setSidebar('');
  }

  return (
    <NavStyled>
      <div className="logo">
        <img src={logo} alt='logo' className="logo-min" />
      </div>
      <div className="menu-right" id={sidebar}>
        <a href="#home" onClick={toggleSidebar}>Home</a>
        <a href="#about" onClick={toggleSidebar}>About Me</a>
        <a href="#portfolio" onClick={toggleSidebar}>Portfolio</a>
        <a href="#contact" onClick={toggleSidebar}>Contact</a>
      </div>
      <motion.div 
        className="toggle" onClick={toggleSidebar}
        whileTap={{ scale: 0.75 }}
        transition={{ duration: 0.1 }}
      >
        <MenuOpen className="toggle-icon" />
      </motion.div>
    </NavStyled>
  );
}

export default Header

const NavStyled = styled.nav`
height: 3rem;
background: rgb(17, 24, 39);
display: flex;
align-items: center;
justify-content: space-between;
align-items: center;
padding: 0 1rem;
color: white;
.logo {
  height: 40%;
  .logo-min {
    background: transparent;
    height: 100%;
  }
}
.menu-right {
  display: flex;
  align-items: center;
  height: 100%;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 0 0.75rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: ease-in-out 0.3s;
    &:hover {
      letter-spacing: 1px;
      color: rgb(174, 174, 174);
      font-size: 1.025rem;
    }
  }
}
.toggle {
  display: none;
}

@media (max-width: 600px) {
  position: fixed;
  width: 100%;
  .menu-right {
    background: rgb(17, 24, 39);
    position: fixed;
    z-index: 100;
    top: 3rem;
    bottom: 0;
    left: 0;
    width: 200px;
    flex-direction: column;
    align-items: flex-start;
    transform: translateX(-120%);
    transition: ease-in-out 0.5s;
    a {
      height: 3rem;
      width: 100%;
      padding-left: 1.25rem;
      justify-content: flex-start;
      &:hover {
        background: rgba(245, 244, 239, 0.1);
      }
    }
  }

  .toggle {
    display: block;
    cursor: pointer;
    .toggle-icon {
      font-size: 2.5rem;
      color: whitesmoke;
    }
  }

  #show {
    transform: translateX(0);
  }
}

@media (max-width: 375px) {
  .menu-right {
    width: 100%;
    padding-top: 2rem;
    a {
      display: flex;
      justify-content: center;
      text-align: center;
    }
  }
}

.transform {
  transform: translateX(-120%);
}

`;
