import {useEffect, useContext, useState} from 'react';
import { appendArticles, getArticle } from "../assets/store/actions";
import { ApiContext } from "../App";

export function useArticles() {
  // @ts-ignore
  const { Api: { articles }, articleState, dispatch } = useContext(ApiContext);
  const  { page } = articleState;
  const [loading, switchLoading] = useState(true);
  useEffect(()=>{
    switchLoading(true);
    articles.list({ page }).then((resp: any): void => {
      const { code, res } = resp;
      if (code !== 200) return;
      const { list, ...paging } = res;
      dispatch(appendArticles({ ...paging, page }, list))
    }).finally((): void =>{
      switchLoading(false);
    })
  }, [page])
  return {
    articleState,
    loading
  }
}

export function useArticle(id: string) {
  // @ts-ignore
  const { Api: { articles }, articleState, dispatch } = useContext(ApiContext);
  const { article, list } = articleState;
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    if (!id || Number(article.id) === Number(id)) {
      return;
    }
    const picked = list.find((item: any)=>item.id === id);
    if (picked) {
      setLoading(false);
      dispatch(getArticle(picked))
    } else {
      articles.get(id).then((resp: any)=>{
        const { code, res } = resp;
        if (code !== 200) return;
        dispatch(getArticle(res))
        setLoading(false);
      })
    }
  }, [article.id, dispatch, articles])
  return {
    loading,
    article,
  }
}
