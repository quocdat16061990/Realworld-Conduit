import axios from 'axios'
export const URL_ARTICLES = 'http://localhost:3010/api/articles'
import { Article, ArticleDetailResponse, ArticleResponse, QueryParams } from 'src/shared/types/article.type'
import { axiosInstance } from './http.services'
const articlesApi = {
  articles(params: QueryParams) {
    return axiosInstance.get<ArticleResponse>('/articles', { params, headers: { 'No-Credentials': 'true' } })
  },
  createNewArticles(body: any) {
    return axiosInstance.post<any>('/articles', body)
  },
  getArticleBySlug(slug: string) {
    return axiosInstance.get<Article>(`/articles/${slug}`)
  },
  deleteArticle(slug: string) {
    return axiosInstance.delete<any>(`/articles/${slug}`)
  }
}
export default articlesApi
