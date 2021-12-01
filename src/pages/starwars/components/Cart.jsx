import React from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import  { removeFromCart, increase } from '../../../redux/actions';
import NavBar from './Navbar';
import { DataGrid } from '@material-ui/data-grid';
import { AddCircleOutline, RemoveCircleOutline, Delete } from '@mui/icons-material';
const Cart = ({ storeCart, removeFromCart }) => {
  
  useEffect(() => {
    console.log(storeCart);
  });

  const cols = [
    {
      field: 'name',
      headerName: 'Item Description',
      width: 175
    },
    {
      field: 'cost_in_credits',
      headerName: 'Item Cost',
      width: 120,
      renderCell: (params) => (
        <>
          {Number(params.row.cost_in_credits).toLocaleString()}
        </>
      )
    },
    {
      field: 'itemCount',
      headerName: 'Qty',
      width: 105,
      renderCell: (params) => (
        <div className="cart-actions">
          <RemoveCircleOutline />
          <span>{params.row.itemCount}</span>
          <AddCircleOutline />
        </div>
      )
    },
    {
      field: 'itemTotal',
      headerName: 'Item Total',
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.itemTotal.toLocaleString()}
        </>
      )
    },
    {
      field: '',
      headerName: '',
      width: 25,
      renderCell: (params) => (
        <div className="cart-actions">
          <Delete className="deleteIcon" onClick={() => removeFromCart(params.row.id)} />
        </div>
      )
    }
  ]
  return (
    <>
      <NavBar />
      <CartComp>
        {storeCart.length === 0 ?
          (<div className="emptyCart">Your cart is currently empty!</div>)
          : (
            <div className="mainCart">
              <h2>Your Cart</h2>
              <DataGrid
                columns={cols}
                rows={storeCart}
                disableSelectionOnClick
                disableColumnMenu={true}
              />
            </div>
          )
        }
        <div className="cartSummary">
          <div className="clear-cart">
            Clear cart
          </div>
          <div className="cart-totals">
            <div>
              <p>Subtotal:</p>
              <p className="amt">NGN 389,394,992</p>
            </div>
            <div>
              <p>VAT (7.5%):</p>
              <p className="amt">NGN 389,394,992</p>
            </div>
            <div style={{ fontWeight: 'bold' }}>
              <p>Total:</p>
              <p className="amt">NGN 389,394,992</p>
            </div>
          </div>
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
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    increase: (id) => dispatch(increase(id)),
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
  max-height: 100%;
  height: 60vh;
  max-width: 650px;
  margin: 5rem auto 1rem auto;
  color: whitesmoke;
  padding: 1rem;
  h2 {
    text-align: center;
    margin: 1rem;
  }
  .MuiDataGrid-root * {
    color: whitesmoke !important;
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
  max-width: 600px;
  margin: 4rem auto 0 auto;
  padding: 1rem;

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

`;