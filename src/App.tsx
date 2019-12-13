import React, { createContext, useReducer} from 'react';
import {
  BrowserRouter as Router, NavLink,
  Route,
} from 'react-router-dom';

import Api from './assets/api';
import Container from './container';
import Sidebar from "./container/Sidebar";

import './App.scss';
import { articleReducer } from "./assets/store/reducers";

export const ApiContext = createContext({})

export default function App() {
  const [ articleState, articleDispatch ] = useReducer(articleReducer, {
    article: {},
    list: [],
    page: 0,
    total: 0,
    size: 10
  });

  return (
    <Router>
      <nav>
        <NavLink to='/' exact className={'nav-link'} activeClassName={'active-link'}>首页</NavLink>
        <NavLink to='/about' exact className={'nav-link'} activeClassName={'active-link'}>关于</NavLink>
      </nav>
      <Route path="/">
        <ApiContext.Provider value={{ Api, articleState, dispatch: articleDispatch }}>
          <section className="container">
            <Container />
          </section>
        </ApiContext.Provider>
      </Route>
      <Sidebar />
    </Router>
  );
}
