import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Posts.scss';

type ArticlesProps = {
  list: Array<{}>,
  noMore?: boolean,
  loading: boolean,
  nextPage: () => void;
}

export default function Posts(props: ArticlesProps) {

  const { list, loading, noMore, nextPage } = props;

  return (
    <ul className="article-list">
      {
          list.map((item: any, index) => (
            <li key={item.id}>
              <Link to={`post/${item.id}`}>
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))
        }
      {
        loading && <li className="loading-control loading">加载中...</li>
      }
      {
        // eslint-disable-next-line
        !loading && !noMore && <li className="loading-control more" onClick={nextPage}>加载更多</li>
      }
      {
        noMore && <li className="loading-control">没有更多了</li>
      }
    </ul>
  );
}
