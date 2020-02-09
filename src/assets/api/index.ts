import {Article, Articles} from "../../types";

const url = (url: string): string => `${process.env.REACT_APP_API_URL}${url}`

const handleResponse = (res: Response)=>res.json();

interface Paging {
  page: number,
  size: number,
  count?: number
}

export default {
  articles: {
    get(id: string | number): Promise<Article> {
      return fetch(url(`/article/${id}`)).then(
        handleResponse
      )
    },
    list(paging: Paging): Promise<Articles> {
      const { page = 0 } = paging;
      return fetch(url(`/articles?page=${page}`)).then(
        handleResponse
      )
    }
  }
}

export const getAlmanacSet = ()=>import('./almanac_set.json');
