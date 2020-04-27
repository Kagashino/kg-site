export const ADD_SUB_APP = 'ADD_SUB_APP';
export const GET_ARTICLE = 'GET_ARTICLE';
export const UPDATE_ARTICLE_LIST = 'UPDATE_ARTICLE_LIST';

export const getArticle = (data: Partial<Article>) => ({
  type: GET_ARTICLE,
  data,
});


export const appendArticles = (paging: Paging, list: Article[]) => {
  const { page = 0, count = 0 } = paging;
  return {
    type: UPDATE_ARTICLE_LIST,
    page,
    count,
    list,
  };
};

export const registerSubApp = (name: string, config: any) => ({
  type: ADD_SUB_APP,
  name,
  config,
});
