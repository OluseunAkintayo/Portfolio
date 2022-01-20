import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShip, addToCart, cleanupItem } from '../../../redux/actions';
import Navbar from './Navbar';
import { CircularProgress } from '@mui/material';
import Footer from './Footer';

let ShipInfo = ({ cart, ship, getShip, addToCart }) => {
  let navigate = useNavigate();
  let { shipName } = useParams();
  let newShips = JSON.parse(localStorage.getItem("ships"));
  let findShip = name => {
    let res = newShips.find(item => item.name.toLowerCase() === name);
    getShip(res);
  }
  let addProduct = (id) => {
    addToCart(id);
  }
  
  let [title, setTitle] = React.useState(document.title);

  useEffect(() => {
    window.scrollTo(0,0);
    findShip(shipName);
  }, [shipName]);

  useEffect(() => {
    let prev = document.title;
    ship !== null ? setTitle(ship.name) : setTitle(document.title);
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [ship, title]);

  return (
    <>
      <ShipInfoComp>
        <Navbar />
        {ship === null || ship === undefined ?
          (<div className="loadingShip"><CircularProgress size="5rem" /></div>)
          : (
            <div className="info-wrapper">
              <h2 className="ship-name">{ship.name}</h2>
              <div className="info-details">
                <div className="ship-img">
                  <img src={ship.poster} alt={ship.name} />
                </div>
                <div className="other-info">
                  <h3 className="price">N {ship.price.toLocaleString()}</h3>
                  <p><span className="bold">Manufacturer:</span> {ship.manufacturer}</p>
                  <p><span className="bold">Model:</span> {ship.model}</p>
                  <p><span className="bold">Class:</span> {ship.manufacturer}</p>
                  <p><span className="bold">Overdrive rating:</span> {ship.starship_class}</p>
                  <p><span className="bold">Cargo Capacity:</span> {ship.cargo_capacity}</p>
                  <p><span className="bold">Crew Count:</span> {ship.manufacturer}</p>
                  <p><span className="bold">Passenger Capacity:</span> {ship.passengers}</p>
                  <p><span className="bold">Supplies Span:</span> {ship.consumables}</p>
                  <div className="actions">
                    <button onClick = {() => addProduct(ship.id)}>
                      Add Item
                    </button>
                    <div className="space"></div>
                    <button onClick={() => navigate("/starwars")}>Continue Shopping</button>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </ShipInfoComp>
      <Footer />
    </>
  )
}

let mapStateToProps = (state) => {
  return {
    ships: state.store.ships,
    cart: localStorage.setItem("cart", JSON.stringify(state.store.cart)),
    ship: state.store.ship,
  }
}

let mapDispatchToProps = dispatch => {
  return {
    getShip: (id) => dispatch(getShip(id)),
    addToCart: (id) => dispatch(addToCart(id)),
    cleanupItem: () => dispatch(cleanupItem()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipInfo);

let ShipInfoComp = styled.section`

.loadingShip {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-details {
  display: flex;
  justify-content: center;
  padding: 1rem;
  max-width: 768px;
  margin: 0 auto;
  .ship-img {
    width: 55vw;
    margin: 0 auto;
    border-radius: 0.25rem;
    overflow: hidden;
    img {
      max-width: 100%;
      height: 80%;
    }
  }
}

.info-wrapper {
  padding-top: 5rem;

  .ship-name {
    text-align: center;
    margin: 1.5rem 0.5rem;
  }

  .other-info {
    padding: 0 1rem;
    width: 100%;
    h3 {
      margin-bottom: 1rem;
      background: rgba(245, 245, 245, 0.1);
      color: rgb(59, 194, 249);
      padding: 1rem;
      text-align: center;
      letter-spacing: 1.5px;
      border-radius: 0.25rem;
      font-size: 1.5rem;
    }
    p {
      line-height: 1.375rem;
      margin-bottom: 0.625rem;
      letter-spacing: 0.75px;
      .bold {
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
  }

  .actions {
    margin: 1rem 0;
    display: flex;
    .space {
      width: 1.5rem;
    }
    button {
      height: 2.5rem;
      font-weight: bold;
      letter-spacing: 0.5px;
      // background: rgb(20, 24, 53);
      background: gray;
      width: 100%;
      border: none;
      outline: none;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }
}

@media(max-width: 640px) {

  .info-wrapper {
    width: 100%;
  }

  .info-details {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .ship-img {
      width: 100%;
      padding: 1rem;
      img {
        width: 100%;
      }
    }
  }

  .price {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
  }

  .other-info {
    margin-top: 1rem;
  }

  .actions {
    display: flex;
    button {
      width: 100%;
    }
  }
}

@media (max-width: 375px) {
  .other-info { padding: unset; }
  .space {
    display: none;
  }
  .actions {
    flex-direction: column;
    width: 100%;
    button {
      margin: 0.5rem 0;
      width: 100vw;
    }
  }
}
`;