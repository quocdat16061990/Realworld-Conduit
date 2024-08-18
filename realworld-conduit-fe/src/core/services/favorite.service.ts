import axios from 'axios'
export const URL_FAVORITE = 'http://localhost:3010/api/favorite'
const favoriteApi = {
  favoriteArticle(slug: string) {
    return axios.post<any>(`${URL_FAVORITE}/${slug}/favorites`, {}, { withCredentials: true })
  },
  unFavoriteArticle(slug: string) {
    return axios.delete<any>(`${URL_FAVORITE}/${slug}/favorites`, { withCredentials: true })
  }
}
export default favoriteApi
