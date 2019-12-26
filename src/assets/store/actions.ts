import { Article } from '../../types';

export const GET_ARTICLE = 'GET_ARTICLE';
export const UPDATE_ARTICLE_LIST = 'UPDATE_ARTICLE_LIST';

export const getArticle = (data: Article) => ({
  type: GET_ARTICLE,
  data,
});


export const appendArticles = (paging: { page: number, total: number }, list: Article[]) => {
  const { page = 0, total = 0 } = paging;
  return {
    type: UPDATE_ARTICLE_LIST,
    page,
    total,
    list,
  };
};
