
import {
  GET_ARTICLE,
  UPDATE_ARTICLE_LIST,
} from './actions';
import { AnyObject } from '../../types';

interface ArticleAction extends AnyObject {
  type: string
}

const ArticleReducer = (state: AnyObject, action: ArticleAction) => {
  switch (action.type) {
    case GET_ARTICLE: return {
      ...state,
      article: action.data,
    };
    case UPDATE_ARTICLE_LIST: {
      const { list: appendList, page, total } = action;
      const list = [...state.list, ...appendList];
      return {
        ...state,
        page,
        list,
        total,
      };
    }
    default: return state;
  }
};

export default ArticleReducer;
