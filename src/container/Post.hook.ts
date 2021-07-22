import {useEffect, useContext, useState, useCallback} from 'react';
import { fetchPosts } from '../assets/api/fetch-posts';


export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const getPosts = useCallback(async (page = 1) =>{
    if (noMore) {
      return;
    }
    setLoading(true)
    try {
      const res = await fetchPosts(page);
      setNoMore(res.length < 10);
      setPosts(p => p.concat(res));
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => setPage(page + 1), [page])

  useEffect(() => {
    getPosts(page);
  }, [getPosts, page])

  return {
    list: posts,
    noMore,
    loading,
    nextPage
  }
}
