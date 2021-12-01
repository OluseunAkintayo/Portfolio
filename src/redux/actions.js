import { actionTypes } from "./actionTypes";

// export const getAllShips = (URL) => async (dispatch, getState) => {
//   dispatch({ type: "FETCH" });
//   try {
//     const response = await axios.get(URL);
//     console.log(response.data);
//     dispatch({ type: "SUCCESS", payload: response.data });
//   } catch(err) {
//     dispatch({ type: "FAILURE", err })
//   }
// }

// export const getShip = URL => async (dispatch, getState) => {
//   dispatch({ type: "ITEM_REQUEST" });
//   try {
//     const response = await axios.get(URL);
//     dispatch({ type: "ITEM_SUCCESS", payload: response.data });
//   } catch (err) {
//     dispatch({ type: "ITEM_FAILURE", err: err });
//   }
// }
// const res = axios.get(URL).then(result => console.log(result)).catch(err => console.log(err));

export const getAllShips = items => {
  return {
    type: actionTypes.GET_ALL,
    payload: items
  }
}

export const getShip = item => {
  return {
    type: actionTypes.GET_SHIP,
    payload: item
  }
}

export const addToCart = (id) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: { id: id }
  }
}

export const removeFromCart = (id) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: { id: id }
  }
}

export const increase = (id, value) => {
  return {
    type: actionTypes.INCREASE,
    payload: { id: id, itemCount: value }
  }
}

export const decrease = (id, value) => {
  return {
    type: actionTypes.DECREASE,
    payload: { id: id, itemCount: value }
  }
}

export const adjustQty = (id, value) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: { id: id, itemCount: value }
  }
}

export const cleanupItem = () => {
  return {
    type: actionTypes.CLEANUP_ITEM,
  }
}