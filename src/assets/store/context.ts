import { createContext, Dispatch } from 'react';
import Api from '../api';

type noop = ()=>void;

interface IApiContext {
  Api: any
  dispatch: Dispatch<{ type: string } & PlainObject> | noop
  article: ArticleState,
  SubApps: PlainObject,
  SubAppList: PlainObject[]
}

const article = {
  current: {
    id: 0,
    title: '',
    tags: '',
    access: 0,
    author: '',
    created: 0,
  },
  list: [],
  page: 0,
  count: 0,
  size: 10,
};

export const AppContextDefault = {
  Api,
  article,
  SubApps: {},
  SubAppList: [],
  dispatch: () => null,
};

export const AppContext = createContext<IApiContext>(AppContextDefault);
