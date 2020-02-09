export const GET_ARTICLE = 'GET_ARTICLE';
export const UPDATE_ARTICLE_LIST = 'UPDATE_ARTICLE_LIST';

export const getArticle = data => ({
  type: GET_ARTICLE,
  data
});


export const appendArticles = (paging, list) => {
  const { page = 0, count = 0 } = paging;
  return {
    type: UPDATE_ARTICLE_LIST,
    page,
    count,
    list
  }
};
