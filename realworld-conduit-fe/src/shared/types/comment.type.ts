export interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  author: Author
}

export interface Author {
  email: string
  id: number
  username: string
}
export interface DeleteCommentResponse {
  message: string
}
