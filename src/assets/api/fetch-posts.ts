// See vite.config.ts
import getPosts from '../../posts/~post-loader';

export async function fetchPosts (page = 0) {
  return getPosts(page, 10);
}

