const url = url=>`${process.env.REACT_APP_API_URL}${url}`

const handleResponse = res=>res.json()

export default {
  articles: {
    get(id) {
      return fetch(url(`/article/${id}`)).then(
        handleResponse
      )
    },
    list(paging = {}) {
      const { page = 0} = paging;
      return fetch(url(`/articles?page=${page}`)).then(
        handleResponse
      )
    }
  }
}
