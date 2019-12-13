import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { ApiContext } from "../App";
import { appendArticles } from "../assets/store/actions";

import './styles/Articles.scss';

type ArticlesProps = {
  page: number,
  total: number,
  list: Array<{}>,
  noMore: boolean,
  loading: boolean,
}
export default function Articles(props: ArticlesProps, ...rest: any[]) {
  // @ts-ignore
  const { dispatch } = useContext(ApiContext);
  console.log(props, rest)
  const {
    loading,
    page,
    total,
    list,
  } = props;

  const handleLoadMore = ()=>{
    if (noMore) {
      return;
    }
    dispatch(appendArticles({ page: page + 1, total }, []))
  }

  const showLoading: boolean = loading;
  const noMore: boolean = !loading && list.length >= total;
  const showLoadMore: boolean = !loading && !noMore;
  return (
    <ul className="article-list">
      {
        list.map((item: any) =>(
          <li key={item.id}>
            <Link to={`article/${item.id}`}>
              <h3>{item.title.replace(/.md$/, '')}</h3>
              <p>{item.context.substr(0, 200)}</p>
              <span>{item.author} | { new Date(item.created).toLocaleString() }</span>
            </Link>
          </li>
        ))
      }
      {
        showLoading && <li className="loading-control loading">加载中...</li>
      }
      {
        showLoadMore && <li className="loading-control more" onClick={ handleLoadMore }>加载更多</li>
      }
      {
        noMore && <li className="loading-control">没有更多了</li>
      }
    </ul>
  )
}
