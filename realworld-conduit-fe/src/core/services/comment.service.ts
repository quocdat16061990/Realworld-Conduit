import axios from 'axios'
export const URL_COMMENT = 'http://localhost:3010/api/comment'
const commentApi = {
  createComment(slug: string, content: any) {
    return axios.post<any>(
      `${URL_COMMENT}/${slug}/comment`,
      {
        content
      },
      { withCredentials: true }
    )
  },
  getComment(slug: string) {
    return axios.get<any>(`${URL_COMMENT}/${slug}/comment`, { withCredentials: true })
  },
  deleteComment(slug: string, id: number) {
    return axios.delete<any>(`${URL_COMMENT}/${slug}/comment/${id}`, { withCredentials: true })
  }
}
export default commentApi
