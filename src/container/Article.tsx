import React from 'react';
import ReactMarkdown from 'react-markdown';
import {RouteComponentProps} from "react-router";
import {useArticle} from "./ArticleHooks";

export default function Article (props: RouteComponentProps<{ id: string }>) {
  const { id } = props.match.params;
  const { article, loading } = useArticle(id);
  if (loading) {
    return <span>loading...</span>
  }
  return <>
    <h3>{ article.title }</h3>
    <div className="brief">{ new Date(article.created).toLocaleString() }</div>
    <p className="context">
      <ReactMarkdown source={article.context} />
    </p>
  </>
}
