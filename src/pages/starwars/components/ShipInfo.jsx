import React, { useEffect, useState } from 'react';
import Footer from '../../main/components/Footer';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getShip, addToCart, cleanupItem } from '../../../redux/actions';
import Navbar from './Navbar';
import { CircularProgress } from '@material-ui/core';


const ShipInfo = ({ ships, ship, getShip, addToCart, cleanupItem }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { shipId } = useParams();
  const findShip = id => {
    const res = ships.find(item => item.id === id);
    getShip(res);
  }
  const img = "https://starwarsblog.starwars.com/wp-content/uploads/2019/09/lego-star-destroyer-TALL.jpg";

  const [unit, setUnit] = useState(null);

  useEffect(() => {
    if(shipId && shipId !== '') {
      findShip(shipId);
      setUnit(ship);
    }
    return () => cleanupItem();
  }, [shipId, ship]);

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
                <img src={img} alt={ship.name} />
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
                  <button
                    onClick = {() => addToCart(ship.id)}
                  >Add Item</button>
                  <div className="space"></div>
                  <button onClick={() => navigate("/projects/starwars")}>Continue Shopping</button>
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
    ship: state.store.ship
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

const ShipInfoComp = styled.section`

.loadingShip {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-details {
  display: flex;
  justify-content: center;
  .ship-img {
    max-width: 375px;
    max-height: 375px;
    margin: 0 1rem;
    border-radius: 0.25rem;
    overflow: hidden;
    img {
      max-width: 100%;
      height: 100%;
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
    h3 {
      margin-bottom: 1rem;
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
      width: 1rem;
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
  .info-details {
    flex-direction: column;
    align-items: center;
  }

  .price {
    text-align: center;
    margin-bottom: 2rem;
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