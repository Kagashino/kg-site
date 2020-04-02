import {useEffect, useContext, useState} from 'react';
import { appendArticles, getArticle } from '../assets/store/actions';
import { ApiContext } from '../assets/store/context';

export function useArticles() {
  const { Api: { articles }, articleState, dispatch } = useContext(ApiContext);
  const { page } = articleState;
  const [loading, switchLoading] = useState(true);
  useEffect(() => {
    switchLoading(true);
    articles.list({ page }).then((resp: any): void => {
      const { list, ...paging } = resp;
      dispatch(appendArticles({ ...paging, page }, list))
    }).finally((): void => {
      switchLoading(false);
    })
  }, [page])
  return {
    articleState,
    loading
  }
}

export function useArticle(id: string) {
  const { Api, articleState, dispatch } = useContext(ApiContext);
  const { article } = articleState;
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.articles.get(id).then((resp: any) => {
      dispatch(getArticle(resp));
      setLoading(false);
      window.scrollTo(0, 0);
    })
  }, [id]);

  return {
    loading,
    article,
  }
}
