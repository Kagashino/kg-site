import React, {lazy, Suspense, useReducer} from 'react';
import {
  BrowserRouter as Router, NavLink,
  Route,
} from 'react-router-dom';

import Container from './container';
import Sidebar from './container/Sidebar';
import {ApiContext, ApiDefault} from './assets/store/context';
import { ArticleReducer } from './assets/store/reducers';

import './App.scss';

const TopJumper = lazy(() => import('./components/TopJumper'));

export default function App() {
  const [articleState, dispatch] = useReducer(ArticleReducer, ApiDefault.articleState)
  return (
    <Router>
      <nav>
        <NavLink to='/' exact className={'nav-link'} activeClassName={'active-link'}>首页</NavLink>
        <NavLink to='/about' exact className={'nav-link'} activeClassName={'active-link'}>关于</NavLink>
      </nav>
      <Route path="/">
        <ApiContext.Provider value={{ ...ApiDefault, articleState, dispatch }}>
          <section className="container">
            <Container />
          </section>
        </ApiContext.Provider>
      </Route>
      <Suspense fallback={'loading...'}>
        <TopJumper />
      </Suspense>
      <Sidebar />
    </Router>
  );
}
