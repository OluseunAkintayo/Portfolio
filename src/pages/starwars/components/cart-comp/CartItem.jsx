import React, { useState } from 'react';
import styled from 'styled-components';
import  { removeFromCart, changeQty } from '../../../../redux/actions';
import { connect } from 'react-redux';
import { AddCircleOutline, RemoveCircleOutline, Delete } from '@mui/icons-material';
import { Tooltip } from '@material-ui/core';


const CartItem = ({ cartItem, remove, changeQty }) => {
  console.log(cartItem);
  const { id, name, itemCount, price } = cartItem;
  
  const [itemQty, setItemQty] = useState(itemCount)
  const onQtyChange = e => {
    if(e.target.value <= 100) {
      setItemQty(e.target.value);
      changeQty(id, e.target.value);
    } else { alert("Out of range! Quantity cannot exceed 100 units.")}
    
  }

  return (
    <>
      <tr className="cart-item-data">
        <td className="cartItemName">{name}</td>
        <td className="price">{price.toLocaleString()}</td>
        <td className="itemQty-container">
        <input type="number" min="1"
          name="itemQty"
          className="itemQty"
          value={itemQty}
          onChange={onQtyChange}
        />
        </td>
        <td className="itemTotal">{ (itemCount * price).toLocaleString()}</td>
        <td className="removeItem">
          <Tooltip title="Remove item">
            <Delete className="remove-btn" onClick={() => remove(id)} />
          </Tooltip>
        </td>
      </tr>      
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    remove: (id) => dispatch(removeFromCart(id)),
    changeQty: (id, value) => dispatch(changeQty(id, value)),
  }
}

export default connect(null, mapDispatchToProps)(CartItem);

const CartItemComp = styled.div`
max-width: 650px;
border: 1px solid whitesmoke;
border-radius: 0.25rem;
margin-bottom: 1.5rem;
height: 2.5rem;
display: flex;
align-items: center;
padding: 0.25rem 1rem;
`;