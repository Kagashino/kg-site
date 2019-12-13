

export interface IArticleContext {
  provider: {
    article: {},
    list: Array<{}>,
    page: number,
    total: number,
    size: number
  }
  consumer: {
    article: {},
    list: Array<{}>,
    page: number,
    total: number,
    size: number
  }
}
