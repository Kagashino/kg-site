import React, {
  createContext, lazy, useReducer, Suspense,
} from 'react';
import {
  BrowserRouter as Router, NavLink,
  Route,
} from 'react-router-dom';

import Api from './assets/api/index';
import Container from './container';
import Sidebar from './container/Sidebar';
import ArticleReducer from './assets/store/reducers';

import './App.scss';

const TopJumper = lazy(() => import('./components/TopJumper'));

export const ApiContext = createContext({});

export default function App() {
  const [articleState, articleDispatch] = useReducer(ArticleReducer, {
    article: {},
    list: [],
    page: 0,
    total: 0,
    size: 10,
  });

  return (
    <Router>
      <nav>
        <NavLink to="/" exact className="nav-link" activeClassName="active-link">首页</NavLink>
        <NavLink to="/about" exact className="nav-link" activeClassName="active-link">关于</NavLink>
      </nav>
      <Route path="/">
        <ApiContext.Provider value={{ Api, articleState, dispatch: articleDispatch }}>
          <section className="container">
            <Container />
          </section>
        </ApiContext.Provider>
      </Route>
      <Suspense fallback="">
        <TopJumper />
      </Suspense>
      <Sidebar />
    </Router>
  );
}
