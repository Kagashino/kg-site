export interface Paging {
  page: number,
  size?: number,
  count: number,
}

export interface PagingList<T> extends Paging {
  list: T[]
}

export interface Article {
  access: number,
  author: string,
  content?: string,
  created: number,
  id: number | string,
  tags: string
  title: string
}

export interface Articles extends PagingList<Article>{}
