import React, {
  lazy, Suspense
} from 'react';
import {
  BrowserRouter as Router, NavLink,
} from 'react-router-dom';
import Container from './container';
import Sidebar from './container/Sidebar';

import './App.scss';

const TopJumper = lazy(() => import('./components/TopJumper'));

export default function App() {
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
      <section className="container">
        <Container />
      </section>
      <Suspense fallback="loading...">
        <TopJumper />
      </Suspense>
      <Sidebar />
    </Router>
  );
}
