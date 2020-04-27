declare interface PlainObject {
  [key: string]: any
}

declare interface Paging {
  page: number,
  size?: number,
  count: number,
}

declare interface PagingList<T> extends Paging {
  list: T[]
}

declare interface Article {
  access: number,
  author: string,
  content?: string,
  created: number,
  id: number | string,
  tags: string
  title: string
}

declare interface ArticleState extends PagingList<Article> {
  current: Article
}

declare interface SubApp {
  version: string,
  name: string,
  title?: string,
  baseUrl: string,
  files: string[]
}

declare module 'programmer-almanac-generator';
