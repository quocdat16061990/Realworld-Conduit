import { Author } from './author.type'
import { Tag } from './tag.type'

export interface Article {
  id: number
  author: Author
  title: string
  content: string
  description: string
  favourites: boolean | undefined
  favortiesCount: number
  slug: string
  tags: Tag[] | undefined
  createdAt: string
  updatedAt: string
}
export interface CreateArticleRequest {
  title: string | undefined
  description: string | undefined
  content: string | undefined
  tags: Tag[] | undefined
}

export interface ArticleResponse {
  enhancedArticles: Article[]
  articlesCount: number
}
export interface ArticleDetailResponse {
  article: Article
}
export interface QueryParams {
  tag?: string
  limit?: number
  offset?: number
}
export interface CreateArticle {
  title: string
  description: string
  content: string
  tags: string[]
}
export type { Tag }
