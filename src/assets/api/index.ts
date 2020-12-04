export const http = (
  path: string,
  ...payload: any[]
) => fetch(
  path.startsWith('http') ? path : `${process.env.REACT_APP_API_URL}${path}`,
  ...payload,
).then(
  (res: Response) => res.json(),
).then(
  ({ code, data, msg }) => {
    if (code === 0) {
      return data;
    }
    return Promise.reject(msg);
  },
);


export default {
  Articles: {
    get(id: string | number): Promise<Article> {
      return http(`/post/${id}`);
    },
    list(paging: Partial<Paging>): Promise<PagingList<Article>> {
      const { page = 0 } = paging;
      return http(`/posts?page=${page}`);
    },
  },
  Manifest: {
    get: (id: string): Promise<PlainObject> => http(
      `${process.env.REACT_APP_OSS_URL}/${id}/subapp-manifest.json?t=${Date.now()}`,
    ),
    list: (): Promise<PlainObject> => http('/manifests'),
  },
};
