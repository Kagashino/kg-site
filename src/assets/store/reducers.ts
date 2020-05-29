import {
  ADD_SUB_APP,
  GET_ARTICLE,
  UPDATE_ARTICLE_LIST,
} from './actions';

interface ArticleAction {
  type: string,
  [key: string]: any
}

export default (state: any, action: ArticleAction) => {
  switch (action.type) {
    case GET_ARTICLE: return {
      ...state,
      article: {
        ...state.article,
        current: action.data,
      },
    };
    case UPDATE_ARTICLE_LIST: {
      const { list: appendList, page, count } = action;
      const list = [...state.article.list, ...appendList];
      return {
        ...state,
        article: {
          ...state.article,
          page,
          list,
          count,
        },
      };
    }
    case ADD_SUB_APP: return {
      ...state,
      SubApps: {
        ...state.SubApps,
        [action.name]: action.config,
      },
    };
    default: return state;
  }
};
