import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import articlesApi from 'src/core/services/article.service'
import authApi from 'src/core/services/auth.service'
import commentApi from 'src/core/services/comment.service'
import favoriteApi from 'src/core/services/favorite.service'
import { toast } from 'react-toastify'
import profileApi from 'src/core/services/profile.services'
import path from 'src/shared/constants/path'

export const useArticleDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const newSlug = slug?.substring(1)

  const [formState, setFormState] = useState<{ content: string }>({ content: '' })

  const {
    data: articleData,
    isLoading: articleLoading,
    error: articleError
  } = useQuery({
    queryKey: ['articles', slug],
    queryFn: () => articlesApi.getArticleBySlug(newSlug as string),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5
  })
  const {
    data: userData,
    isLoading: userLoading,
    error: userError
  } = useQuery({
    queryKey: ['getProfile'],
    queryFn: () => profileApi.getProfile()
  })

  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => commentApi.getComment(newSlug as string),
    enabled: !!slug
  })

  const favoriteMutation = useMutation({
    mutationFn: (slug: string) => favoriteApi.favoriteArticle(slug),
    onSuccess: (data, slug) => {
      queryClient.setQueryData(['articles', slug], (oldData: any) => {
        console.log('oldDataa: ', oldData)
        if (oldData) {
          return {
            ...oldData,
            favortiesCount: oldData.favortiesCount + 1,
            favourites: true
          }
        }
        return oldData
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to favorite article')
    }
  })
  const unfavoriteMutation = useMutation({
    mutationFn: (slug: string) => favoriteApi.unFavoriteArticle(slug),
    onSuccess: (data, slug) => {
      queryClient.setQueryData(['articles', slug], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            favortiesCount: oldData.favortiesCount - 1,
            favourites: false
          }
        }
        return oldData
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unfavorite article')
    }
  })

  const followMutation = useMutation({
    mutationFn: (username: string) => profileApi.follow(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile'] })
      toast.success('Followed successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to follow user')
    }
  })
  const unFollowMutation = useMutation({
    mutationFn: (username: string) => profileApi.unfollow(username),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProfile'] })
      toast.success('UnFollow successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to Unfollow user')
    }
  })
  const createCommentMutation = useMutation({
    mutationFn: (content: string) => commentApi.createComment(newSlug as string, content),
    onSuccess: () => {
      toast.success('Comment posted successfully!')
      queryClient.invalidateQueries({ queryKey: ['comments', slug] })
      setFormState({ content: '' })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to post comment')
    }
  })
  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) => commentApi.deleteComment(newSlug as string, commentId),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message)
      queryClient.invalidateQueries({ queryKey: ['comments', slug] })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete comment')
    }
  })
  const deleteArticle = useMutation({
    mutationFn: (newSlug: string) => articlesApi.deleteArticle(newSlug as string),
    onSuccess: () => {
      toast.success('Delete Article Successfully')
      navigate(path.home)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete comment')
    }
  })
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (userData) {
      createCommentMutation.mutate(formState.content)
    }
  }
  const handleDeleteComment = (id: number) => {
    deleteCommentMutation.mutate(id)
  }
  const handleEditArticle = (slug: number) => {
    navigate(`/article/:${slug}`)
  }
  const handleDeleteArticle = (slug: string) => {
    deleteArticle.mutate(slug)
  }
  const handleFollowArticle = (username: string, follow: boolean) => {
    if (follow) {
      unFollowMutation.mutate(username)
    } else {
      followMutation.mutate(username)
    }
  }
  const handleFavoriteArticle = (slug: string, favorite: boolean) => {
    if (!favorite) {
      favoriteMutation.mutate(slug)
    } else {
      unfavoriteMutation.mutate(slug)
    }
  }
  return {
    articleData,
    userData,
    commentsData,
    handleChange,
    handleSubmit,
    handleDeleteComment,
    handleEditArticle,
    handleDeleteArticle,
    handleFavoriteArticle,
    handleFollowArticle,
    formState
  }
}
