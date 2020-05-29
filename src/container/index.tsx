import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Articles from './Articles';
import About from './About';
import Article from './Article';
import { useArticles } from './Article.hook';
import SubAppContainer from '../components/SubAppContainer';

export default function Container() {
  const { article, loading } = useArticles();
  return (
    <Switch>
      <Route exact path="/" component={() => Articles({ loading, ...article })} />
      <Route exact path="/article/:id" component={Article} />
      <Route exact path="/about" component={About} />
      <Route
        path="/app/:id"
        component={SubAppContainer}
      />
    </Switch>
  );
}
