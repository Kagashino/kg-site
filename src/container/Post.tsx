import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// if import module directly `process.cwd()` will throw error in vite devmode
import ReactMarkdown from 'react-markdown/umd/react-markdown.js';
import { getPostById } from '../posts/~post-loader';

function Post({ list }) {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    let lock = true;

    let current = list.find(post => post.id === +id) ?? getPostById(+id);
    if (current) {
      setTitle(current.title);
      setLoading(true)
      current.fetch().then(res => {
        setContent(res.default);
      }).finally(() => setLoading(false))
    }

    return () => {
      lock = false;
    }
  }, [id])

  const Loading = (
    <span>loading...</span>
  );

  return (
    <Suspense fallback={Loading}>
      <h3>{ `${title || ''}`.replace(/\.md$/, '') }</h3>
      <p>
        <ReactMarkdown
          source={content}
        />
      </p>
    </Suspense>
  );
}

export default Post;
