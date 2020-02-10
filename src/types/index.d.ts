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

export type AlmanacActivity = {
	name: string,
	good: string,
	bad: string,
  weekend?: boolean
}


export type AlmanacSet = {
  Weeks: Array
  Activities: Array
  Specials: Array
  Directions: Array
  Tools: Array
  Variables: Array
  Drinks: Array
}


export type AlmanacResult = {
  todayStr: string
  good: Array<{ name: string, good: string, bad: string, weekend?: boolean }>
  bad: Array<{ name: string, good: string, bad: string, weekend?: boolean }>
  direction: string
  drink: string[]
  rate: string
}
