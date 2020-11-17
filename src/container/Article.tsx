import React, { lazy, Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useArticle } from './Article.hook';

const ArticleContent = lazy(() => import('../components/ArticleContent'));

function Article({ match }: RouteComponentProps<{ id: string }>) {
  const { id } = match.params;
  const {
    current: {
      title, created, content,
    },
    loading,
  } = useArticle(id);

  const Loading = (
    <span>loading...</span>
  );

  if (loading) {
    return Loading;
  }

  return (
    <Suspense fallback={Loading}>
      <ArticleContent title={title} created={created} content={content} />
    </Suspense>
  );
}

export default Article;
