import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
    title: string
    created: number
    content?: string
}

const ArticleContent: FC<Props> = ({ title, created, content }) => (
  <>
    <h3>{ `${title || ''}`.replace(/\.md$/, '') }</h3>
    <div className="brief">{ new Date(created).toLocaleString() }</div>
    <p>
      <ReactMarkdown
        source={content}
      />
    </p>
  </>
);

export default ArticleContent;
