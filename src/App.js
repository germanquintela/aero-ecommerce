import React, { useState } from 'react';
import store from './store';
import { Provider} from 'react-redux';
import './index.scss';
import NavBar from './components/NavBar';
import useFetch from './hooks/useFetch'
import {urlApi} from './utils/constants'


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home/index'
import Profile from './pages/Profile'

export default function App() {

  const resultUser = useFetch(`${urlApi}/user/me`, 'GET');
  const [product, setProduct] = useState()


  const getProductsCart = (product) => {
    setProduct(product)
  }

  const modifyPoints = (points) => {
    resultUser.result.points = points
  }
  
  return (
    <Provider store={store}>
      <Router>
        <NavBar product={product} userData={resultUser} modifyPoints={modifyPoints}/>
        <Switch>
          <Route path="/" exact={true}>
              <Home getProductsCart={getProductsCart} userData={resultUser} />
          </Route>
        </Switch>
        <Switch>
          <Route path="/me" exact={true}>
              <Profile userData={resultUser} modifyPoints={modifyPoints} />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
