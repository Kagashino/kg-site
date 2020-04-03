import { createContext, Dispatch } from 'react';
import Api from '../api';
import { Article, Articles, PlainObject } from '../../types';

interface ArticleState extends Articles {
  article: Article,
}

type noop = ()=>void;


interface IApiContext {
  Api: any
  dispatch: Dispatch<{ type: string } & PlainObject> | noop
  articleState: ArticleState
}

const articleState = {
  article: {
    id: 0,
    title: '',
    tags: '',
    access: 0,
    author: '',
    created: 0
  },
  list: [],
  page: 0,
  count: 0,
  size: 10
};

export const ApiDefault = {
  Api,
  articleState,
  dispatch: () => null
};

export const ApiContext = createContext<IApiContext>(ApiDefault);
