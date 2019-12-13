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
      console.log(state, action)
      const { list: appendList, page, total } = action;
      const list = [...state.list, ...appendList]
      return {
        ...state,
        page,
        list,
        total
      }
    }
    default: return state;
  }
}
