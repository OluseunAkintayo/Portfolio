import { combineReducers } from "redux";
import { actionTypes } from  './actionTypes';

const init = {
  starwars: {
    ships: [],
    ship: null,
    cart: [],
    error: null
  }
}

const shipsReducer = (state=init.starwars, { type, payload }) => {
  switch(type) {
    case actionTypes.GET_ALL:
      return { ...state, ships: payload };
    case actionTypes.GET_SHIP:
      return { ...state, ship: payload }
    case actionTypes.ADD_TO_CART:
      let item = state.ships.find(unit => unit.id === payload.id);
      item.inCart = state.cart.find(unit => unit.id === payload.id) ? true : false;
      return {
        ...state,
        cart: item.inCart ?
          state.cart.map(item => item.id === payload.id ? 
            { ...item, itemCount: item.itemCount + 1, itemTotal: (item.itemCount + 1) * Number(item.cost_in_credits), inCart: true } : item)
          : [...state.cart, { ...item, itemCount: 1, itemTotal: Number(item.cost_in_credits), inCart: true }]
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(unit => unit.id !== payload.id)
      };
    case actionTypes.INCREASE:
      return {
        ...state,
        cart: state.cart.map(unit => unit.id === payload.id ? { ...unit, itemCount: payload.itemCount + 1 } : unit)
      }
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map(unit => unit.id === payload.id ? { ...unit, itemCount: payload.itemCount } : unit)
      };
    case actionTypes.CLEANUP_ITEM:
      return { ...state, ship: null };
    default:
      return state;
  }
}

// const cartReducer = (state=init.cart, { type, payload }) => {
//   switch(type) {
    
//     default:
//       return state;
//   }
// }



const reducers = combineReducers({
  store: shipsReducer
})

export default reducers;