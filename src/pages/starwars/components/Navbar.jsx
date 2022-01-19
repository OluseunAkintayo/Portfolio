import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShoppingCartCheckout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = ({ cart }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cartCount = 0;
    cart.forEach(item => {
      cartCount += item.itemCount;
    });
    setCount(cartCount);
  }, [cart, count]);

  return (
    <NavComp>
      <h3><Link to="/starships">Star Ships</Link></h3>
      <div className="cart-link">
        <Link to="/starships/checkout">
          <ShoppingCartCheckout className="cartIcon" />
          <div className="cart-length">{count}</div>
        </Link>
      </div>
    </NavComp>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.store.cart
  }
};

export default connect(mapStateToProps)(Navbar);

const NavComp = styled.nav`
color: whitesmoke;
display: flex;
justify-content: space-between;
align-items: center;
padding: 1rem 1.5rem;
position: fixed;
top: 0;
z-index: 20;
width: 100%;
background: rgb(10, 14, 23);

div {
  cursor: pointer;
}
.cartIcon {
  font-size: 2.25rem;
}

.cart-link {
  height: 100%;
  position: relative;
  .cart-length {
    background: red;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.375rem;
    font-size: 0.8rem;
    aspect-ratio: 1;
    border-radius: 50%;
    position: absolute;
    top: -0.5rem;
    right: -0.875rem;

  }
}
`;