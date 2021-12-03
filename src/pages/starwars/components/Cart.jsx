import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NavBar from './Navbar';
import CartItem from './cart-comp/CartItem';
import { clearCart } from '../../../redux/actions';

const Cart = ({ storeCart, clearCart }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  useEffect(() => {
    let count = 0;
    let total = 0;
    storeCart.forEach(item => {
      count += item.itemCount;
      total += item.itemCount * item.price;
    })
    setTotalCount(count);
    setCartTotal(total);
  }, [storeCart, totalCount, cartTotal, setTotalCount, setCartTotal]);

  return (
    <>
      <NavBar />
      <CartComp>
        {storeCart.length === 0 ?
          (<div className="emptyCart">Your cart is currently empty!</div>)
          : (
            <div className="mainCart">
              <h2>Your Cart</h2>
              <div className="cart-items-container">
                <table className="cart-items-wrapper">
                  <th className="description">Description</th>
                  <th className="cost">Cost</th>
                  <th className="qty">Qty</th>
                  <th className="amt">Amount</th>
                  <th style={{ width: '2rem' }}></th>
                  {storeCart.map(item  => <CartItem key={item.id} cartItem={item} />)}
                </table>
              </div>
            </div>
          )
        }
        <div className="cartSummary">
          <div className="clear-cart" onClick={() => clearCart()}>
            Clear cart
          </div>
          <div className="cart-totals">
            <div>
              <p>Subtotal:</p>
              <p className="amt">N { Number(cartTotal.toFixed(2)).toLocaleString() }</p>
            </div>
            <div>
              <p>VAT (7.5%):</p>
              <p className="amt">N { (cartTotal.toFixed(2) * 0.075).toLocaleString() }</p>
            </div>
            <div style={{ fontWeight: 'bold' }}>
              <p>Total:</p>
              <p className="amt">N { (cartTotal * 1.075).toLocaleString() }</p>
            </div>
          </div>
        </div>
        <div className="check-out">
          <button>Check Out</button>
        </div>
      </CartComp>
    </>
  )
}

const mapStateToProps = state => {
  return {
    storeCart: state.store.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch(clearCart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const CartComp = styled.section`
height: 100%;

.emptyCart {
  margin: 6rem 1rem 1rem 1rem;
  color: whitesmoke;
  text-align: center;
  font-size: 1.5rem;
}

.mainCart {
  max-width: 650px;
  margin: 5rem auto 0 auto;
  color: whitesmoke;
  padding: 1rem;
  h2 {
    text-align: center;
    margin: 1rem;
  }  
}

.cart-items-container {
  overflow-x: auto;
}

.cart-items-wrapper {
  width: 100%;
  font-size: 0.75rem;
  th.description {
    padding: 0 0.5rem 0.5rem 0;
    text-align: left;
  }
  th.cost {
    text-align: right;
    padding: 0 0.25rem;
  }
  th.qty {
    text-align: center;
    padding: 0 0.25rem;
    width: 4rem;
    text-align: center;
  }
  th.amt {
    text-align: right;
    padding: 0 0.25rem;
  }
  tr.cart-item-data {
    height: 2.5rem;

    .cartItemName {
      min-width: 140px;
    }
    .price {
      text-align: right;
      padding: 0 0.25rem;
    }
    .itemTotal {
      text-align: right;
      padding: 0 0.25rem;
    }
    .removeItem {
      text-align: right;
    }
    .remove-btn {
      color: rgba(255, 0, 0, 0.75);
      cursor: pointer;
    }
    .itemQty-container {

    }
    .itemQty {
      height: 2rem;
      width: 3rem;
      margin: 0 0.5rem;
      text-align: center;
      background: rgba(245, 245, 245, 0.05);
      border: none;
      outline: none;
      color: inherit;
      font-size: inherit;
    }
  }
}

.cart-actions {
  display: flex;
  align-items: center;
  span {
    margin: 0 0.5rem;
  }
  .deleteIcon {
    cursor: pointer;
  }
}

.cartSummary {
  display: flex;
  justify-content: space-between;
  max-width: 650px;
  margin: 1rem auto 0 auto;
  padding: 1rem;

  .clear-cart {
    background: rgba(255,0,0,0.75);
    cursor: pointer;
    padding: 0.5rem 0.25rem;
    transition: ease-in 0.3s;
    min-width: 100px;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    &:hover {
      background: rgba(255,0,0,0.5);
      letter-spacing: 0.5px;
    }
  }

  @media(max-width: 345px) {
    flex-direction: column;

    .clear-cart {
      margin-bottom: 2rem;
    }
  }

  .cart-totals {
    text-align: right;
    max-width: 300px;
    line-height: 1.5rem;
    div {
      display: flex;
      justify-content: space-between;
      .amt {
        margin-left: 1rem;
      }
    }
  }
}

.check-out {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  height: 2.5rem;
  padding: 0 1rem;
  button {
    display: block;
    height: 100%;
    width: calc(200px - 1.5rem);
    background: rgba(0, 255, 0, 0.4);
    color: whitesmoke;
    border: none;
    outline: none;
    border-radius: 0.25rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    transition: ease-in 0.3s;
    cursor: pointer;
    &:hover {
      background: rgba(0, 255, 0, 0.3);
      letter-spacing: 1px;
    }
  }

  @media(max-width: 345px) {
    
    button {
      width: 100%;
    }
  }
}

`;