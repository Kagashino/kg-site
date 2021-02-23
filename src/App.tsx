import React, { lazy, Suspense, useReducer } from 'react';
import {
  BrowserRouter as Router, NavLink,
  Route,
} from 'react-router-dom';

import Container from './container';
import Sidebar from './container/Sidebar';
import { AppContext, AppContextDefault } from './assets/store/context';
import ArticleReducer from './assets/store/reducers';

import './App.scss';

const TopJumper = lazy(() => import('./components/TopJumper'));

export default function App() {
  const [{ article, SubApps }, dispatch] = useReducer(ArticleReducer, AppContextDefault);
  return (
    <Router>
      <nav>
        <NavLink
          to="/"
          replace
          exact
          className="nav-link"
          activeClassName="active-link"
        >
          首页
        </NavLink>
        {/*
          <NavLink
            to="/apps"
            replace
            exact
            className="nav-link mobile-only"
            activeClassName="active-link"
          >
            子应用
          </NavLink>
        */}
        <NavLink
          to="/about"
          replace
          exact
          className="nav-link"
          activeClassName="active-link"
        >
          关于
        </NavLink>
      </nav>
      <Route path="/">
        <AppContext.Provider value={{
          ...AppContextDefault,
          article,
          SubApps,
          dispatch,
        }}
        >
          <section className="container">
            <Container />
          </section>
        </AppContext.Provider>
      </Route>
      <Suspense fallback="loading...">
        <TopJumper />
      </Suspense>
      <Sidebar />
    </Router>
  );
}
