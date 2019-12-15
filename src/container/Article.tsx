import React from 'react';
import { RouteComponentProps } from "react-router";
import ReactMarkdown from 'react-markdown';
import { useArticle } from "./ArticleHooks";

import './styles/prism.css'

function Article (props: RouteComponentProps<{ id: string }>) {
  const { id } = props.match.params;
  const { article, loading } = useArticle(id);

  if (loading) {
    return <span>loading...</span>
  }
  return <>
    <h3>{ `${article.title || ''}`.replace(/\.md$/, '') }</h3>
    <div className="brief">{ new Date(article.created).toLocaleString() }</div>
    <p className="context">
      <ReactMarkdown source={article.context} />
    </p>
  </>
}

export default Article;
