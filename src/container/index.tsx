import React from 'react';
import { Route, Switch } from 'react-router';
import Articles from './Articles';
import About from './About';
import Article from './Article';
import { useArticles } from './ArticleHooks';

export default function Container() {
  const { articleState, loading } = useArticles()
  return (
    <Switch>
      <Route exact path="/" component={ ()=>Articles({ loading, ...articleState }) } />
      <Route exact path="/article/:id" component={ Article } />
      <Route exact path="/about" component={ About} />
    </Switch>
  )
}
