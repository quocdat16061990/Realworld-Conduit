import axios from 'axios'
export const URL_ARTICLES = 'http://localhost:3010/api/articles'
const articlesApi = {
  articles() {
    return axios.get<any>(URL_ARTICLES, { withCredentials: true })
  },
  createNewArticles(body: any) {
    return axios.post<any>(`${URL_ARTICLES}/articles`, { body }, { withCredentials: true })
  },
  getArticleBySlug(slug: string) {
    return axios.get<any>(`${URL_ARTICLES}/${slug}`, { withCredentials: true })
  },
  postComment(slug: string, content: any) {
    return axios.post<any>(
      `${URL_ARTICLES}/${slug}/comment`,
      {
        content
      },
      { withCredentials: true }
    )
  },
  getComment(slug: string) {
    return axios.get<any>(`${URL_ARTICLES}/${slug}/comment`, { withCredentials: true })
  },
  deleteComment(slug: string, id: number) {
    return axios.delete<any>(`${URL_ARTICLES}/${slug}/comment/${id}`, { withCredentials: true })
  },
  favoriteArticle(slug: string) {
    return axios.post<any>(`${URL_ARTICLES}/${slug}/favorites`, {}, { withCredentials: true })
  },
  unFavoriteArticle(slug: string) {
    return axios.delete<any>(`${URL_ARTICLES}/${slug}/favorites`, { withCredentials: true })
  }
}
export default articlesApi
