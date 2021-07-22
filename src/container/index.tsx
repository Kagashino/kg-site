import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import About from './About';
import Post from './Post';
import SubApps from './SubApps';
import {usePosts} from './Post.hook';

export default function Container() {

  const { list, loading, noMore, nextPage } = usePosts();

  return (
    <Switch>
      <Route exact path="/" render={() => <Posts list={list} loading={loading} nextPage={nextPage} noMore={noMore} />} />
      <Route exact path="/post/:id" render={() => <Post list={list} />} />
      <Route exact path="/about" component={About} />
      <Route exact path="/apps" component={SubApps} />
    </Switch>
  );
}
