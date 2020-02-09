import {
  GET_ARTICLE,
  UPDATE_ARTICLE_LIST
} from "./actions";

export const articleReducer = (state, action)=>{
  switch (action.type) {
    case GET_ARTICLE: return {
      ...state,
      article: action.data
    }
    case UPDATE_ARTICLE_LIST: {
      const { list: appendList, page, count } = action;
      const list = [...state.list, ...appendList]
      return {
        ...state,
        page,
        list,
        count
      }
    }
    default: return state;
  }
}
