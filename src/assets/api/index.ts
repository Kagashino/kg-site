export const http = (
  path: string,
  ...payload: any[]
) => fetch(
  path.startsWith('http') ? path : `${process.env.REACT_APP_API_URL}${path}`,
  ...payload,
).then(
  (res: Response) => res.json(),
);


export default {
  Articles: {
    get(id: string | number): Promise<Article> {
      return http(`/article/${id}`);
    },
    list(paging: Partial<Paging>): Promise<PagingList<Article>> {
      const { page = 0 } = paging;
      return http(`/articles?page=${page}`);
    },
  },
  Manifest: {
    get: (id: string): Promise<PlainObject> => http(`/manifest/${id}`).then(([raw]) => raw),
    list: (): Promise<PlainObject> => http('/manifests'),
  },
};
