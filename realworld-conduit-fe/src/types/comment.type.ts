import { Author } from "./author.type"

export interface Comment {
    id: number
    content: string
    createdAt: string
    updatedAt: string
    author: Author
  }
  

  export interface DeleteCommentResponse {
    message: string
  }