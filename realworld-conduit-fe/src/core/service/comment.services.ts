import axios from 'axios'
import { axiosInstance } from './http.services'
import { Comment, DeleteCommentResponse } from 'src/shared/types/comment.type'
const commentApi = {
  createComment(slug: string, content: any) {
    return axiosInstance.post<any>(`/comment/${slug}/comment`, {
      content
    })
  },
  getComment(slug: string) {
    return axiosInstance.get<Comment[]>(`/comment/${slug}/comment`)
  },
  deleteComment(slug: string, id: number) {
    return axiosInstance.delete<DeleteCommentResponse>(`/comment/${slug}/comment/${id}`)
  }
}
export default commentApi