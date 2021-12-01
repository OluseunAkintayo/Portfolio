import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addToCart } from '../../../redux/actions';
import { Link } from 'react-router-dom';

const Ship = ({ ship, addToCart }) => {
  // console.log(props);
  const img = "https://i.ebayimg.com/images/g/ingAAOSwm8tejYRs/s-l400.jpg";
  const { id, name, cost_in_credits } = ship;
  
  return (
    <ShipComp>
      <div className="ship-item">
        <Link to={`/ships/${id}`}>
          <img src={img} alt="" />
          <div className="ship-item-footer">
            <p>{name}</p>
            <p>{cost_in_credits === "unknown" ? Math.ceil(Math.random() * 9438539).toLocaleString() : Number(cost_in_credits).toLocaleString()}</p>
          </div>
        </Link>
        <button
          className="addToCart"
          onClick = {() => addToCart(id)}
        >Add Item</button>
      </div>
    </ShipComp>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}

export default connect(null, mapDispatchToProps)(Ship);

const ShipComp = styled.div`
.ship-item {
  width: 250px;
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
  margin: 1rem;
  background: pink;
  border: 1px solid rgba(245, 245, 245, 0.5);
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }

  .ship-item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    background: rgb(10, 14, 23);
    z-index: 5;
    bottom: 0;
    width: 100%;
    padding: 0.375rem 0;
    p { 
      margin: 0.25rem;
      font-size: 0.875rem;
    }
  }

  .addToCart {
    background: rgb(10, 14, 23);
    position: absolute;
    right: 0;
    bottom: 3rem;
    color: whitesmoke;
    border-radius: 0.25rem 0 0 0.25rem;
    padding: 0.625rem 0.875rem;
    letter-spacing: 0.5px;
    border: none;
    transform: translateX(110%);
    transition: ease-in-out 0.3s;
    cursor: pointer;
    &:hover {
      background: rgb(20, 24, 53);
    }
  }

  &:hover .addToCart {
    transform: translateX(0);
  }
}

`;