import axios from 'axios'
export const URL_ARTICLES = 'http://localhost:3010/api/articles'
import { Article, ArticleDetailResponse, ArticleResponse, QueryParams } from 'src/shared/types/article.type'
const articlesApi = {
  articles(params: QueryParams) {
    return axios.get<ArticleResponse>(URL_ARTICLES, {
      params,
      withCredentials: true
    })
  },
  createNewArticles(body: any) {
    return axios.post<any>(`${URL_ARTICLES}/articles`, body, { withCredentials: true })
  },
  getArticleBySlug(slug: string) {
    return axios.get<Article>(`${URL_ARTICLES}/${slug}`, { withCredentials: true })
  },

  deleteArticle(slug: string) {
    return axios.delete<any>(`${URL_ARTICLES}/articles/${slug}`, { withCredentials: true })
  }
}
export default articlesApi
