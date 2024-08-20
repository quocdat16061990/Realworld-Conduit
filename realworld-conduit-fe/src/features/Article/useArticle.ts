import { useQuery, useQueryClient } from '@tanstack/react-query'
import authApi from 'src/core/services/auth.service'
import articlesApi from 'src/core/services/article.service'

export function useArticles(selectedTag: string | null) {
  const queryClient = useQueryClient()

  const {
    status: userStatus,
    data: userData,
    error: userError
  } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: authApi.getCurrentUser
  })

  const {
    status: articlesStatus,
    data: articleData,
    error: articlesError
  } = useQuery({
    queryKey: ['articles', selectedTag],
    queryFn: () => articlesApi.articles({ tag: selectedTag || undefined }),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5
  })

  const handleTagClick = (tag: string) => {
    console.log('tag: ', tag)
    const cachedData = queryClient.getQueryData(['articles', tag])
    if (cachedData) {
      queryClient.setQueryData(['articles', tag], cachedData)
    } else {
      queryClient.invalidateQueries({ queryKey: ['articles', tag] })
    }
  }
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  return {
    userStatus,
    userData,
    userError,
    articlesStatus,
    articleData,
    articlesError,
    handleTagClick,
    isAuthenticated
  }
}
