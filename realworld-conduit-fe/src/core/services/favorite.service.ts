import axios from 'axios'
import { axiosInstance } from './http.services'
import { Article } from 'src/shared/types/article.type'
export const URL_FAVORITE = 'http://localhost:3010/api/favorite'
const favoriteApi = {
  favoriteArticle(slug: string) {
    return axiosInstance.post<Article>(`favorite/${slug}/favorites`)
  },
  unFavoriteArticle(slug: string) {
    return axiosInstance.delete<Article>(`favorite/${slug}/favorites`)
  }
}
export default favoriteApi
