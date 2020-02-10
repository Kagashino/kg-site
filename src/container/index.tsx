import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Articles from './Articles';
import About from './About';
import Article from './Article';
import Almanac from './Almanac';
import { useArticles } from './Article.hook';


export default function Container() {
  const { articleState, loading } = useArticles()
  return (
    <Switch>
      <Route exact path="/" component={ ()=>Articles({ loading, ...articleState }) } />
      <Route exact path="/article/:id" component={ Article } />
      <Route exact path="/about" component={ About} />
      <Route exact path="/almanac" component={ Almanac } />
    </Switch>
  )
}
