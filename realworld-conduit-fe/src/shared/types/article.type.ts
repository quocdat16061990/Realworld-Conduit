import { Author } from './author.type'
import { Tag } from './tag.type'

export interface Article {
  id: number
  author: Author
  title: string
  content: string
  description: string
  favorite: boolean
  favoritesCount: number
  slug: string
  tags: Tag[]
  createdAt: string
  updatedAt: string
}
export interface CreateArticleRequest {
  title: string
  description: string
  content: string
  tags: string[]
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
