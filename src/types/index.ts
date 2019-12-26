export interface AnyObject {
  [key: string]: any;
}


export interface Paging<T> {
  page: number,
  size: number,
  total?: number,
  list: T[]
}


export interface Article {
  access: number,
  author: string,
  context?: string,
  created: number,
  id: number | string,
  tags: string
  title: string
}

export interface Articles extends Paging<Article>{}
