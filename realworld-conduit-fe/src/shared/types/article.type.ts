export interface Author {
  shortBio: string | null
  avatar: string | null
  username: string
  createdAt?: string
  updateAt?: string
}

export interface Tag {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface Article {
  id: number
  author: Author
  title: string
  content: string
  description: string
  favorite: boolean
  favoritesCount: number
  favourites?: any
  slug: string
  tags: Tag[]
  createdAt: string
  updatedAt: string
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
