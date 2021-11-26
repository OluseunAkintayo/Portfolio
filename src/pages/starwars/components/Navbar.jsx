import React from 'react';
import styled from 'styled-components';
import { ShoppingCartCheckout } from '@mui/icons-material';

const Navbar = () => {
  return (
    <NavComp>
      <h3>Star Wars</h3>
      <div><ShoppingCartCheckout className="cartIcon" /></div>
    </NavComp>
  )
}

export default Navbar

const NavComp = styled.nav`
color: whitesmoke;
display: flex;
justify-content: space-between;
align-items: center;
padding: 2rem 1rem;

.cartIcon {
  font-size: 2.25rem;
}
`;