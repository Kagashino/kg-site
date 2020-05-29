import { useEffect, useContext, useState } from 'react';
import { appendArticles, getArticle } from '../assets/store/actions';
import { AppContext } from '../assets/store/context';

export function useArticles() {
  const { Api: { Articles }, article, dispatch } = useContext(AppContext);
  const { page } = article;
  const [loading, switchLoading] = useState(true);
  useEffect(() => {
    switchLoading(true);
    Articles.list({ page }).then((resp: any): void => {
      const { list, ...paging } = resp;
      dispatch(appendArticles({ ...paging, page }, list));
    }).finally((): void => {
      switchLoading(false);
    });
  }, [Articles, dispatch, page]);
  return {
    article,
    loading,
  };
}

export function useArticle(id: string) {
  const { Api: { Articles }, article, dispatch } = useContext(AppContext);
  const { current } = article;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Articles.get(id).then((resp: any) => {
      dispatch(getArticle(resp));
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [Articles, dispatch, id]);

  return {
    loading,
    current,
  };
}
