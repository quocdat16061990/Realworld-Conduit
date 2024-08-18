import React, { useState } from 'react'
import './ArticleDetail.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import path from 'src/shared/constants/path'
import Button from 'src/shared/components/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import articlesApi from 'src/core/services/article.service'
import authApi from 'src/core/services/auth.service'
import { toast } from 'react-toastify'
import profileApi from 'src/core/services/profile.services'
import commentApi from 'src/core/services/comment.service'
import favoriteApi from 'src/core/services/favorite.service'
const ArticleDetail = () => {
  const { slug } = useParams()
  const newSlug = slug?.substring(1)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [formState, setFormState] = useState<{ content: string }>({
    content: ''
  })
  const {
    data: articleData,
    isLoading: articleLoading,
    error: articleError
  } = useQuery({
    queryKey: ['articles', slug],
    queryFn: () => articlesApi.getArticleBySlug(newSlug as string)
  })
  const {
    data: userData,
    isLoading: userLoading,
    error: userError
  } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: () => authApi.getCurrentUser()
  })
  const favoriteMutation = useMutation({
    mutationFn: (slug: string) => favoriteApi.favoriteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })
  const unfavoriteMutation = useMutation({
    mutationFn: (slug: string) => favoriteApi.unFavoriteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })
  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => commentApi.getComment(newSlug as string),
    enabled: !!slug
  })

  const followMutation = useMutation({
    mutationFn: (username: string) => profileApi.follow(username),
    onSuccess: () => {
      toast.success('Followed successfully!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to follow user')
    }
  })
  const comment = commentsData?.data?.comments

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
    mutationFn: (slug: string) => articlesApi.deleteArticle(newSlug as string),
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
  const handleEditArticle = (id: number) => {}
  const handleDeleteArticle = (slug: string) => {
    deleteArticle.mutate(slug)
  }
  const handleFollowArticle = (username: string) => {
    followMutation.mutate(username)
  }
  const handleFavoriteArticle = (slug: string, favorite: any) => {
    if (favorite.length === 0) {
      favoriteMutation.mutate(slug)
    } else {
      unfavoriteMutation.mutate(slug)
    }
  }
  return (
    <div className='article-detail'>
      <div className='article-detail-banner'>
        <div className='container'>
          <h1 className='title'>{articleData?.data?.title}</h1>
          <div className='article-meta'>
            <div className='info'>
              <Link className='author' to={path.home}>
                {articleData?.data?.author?.username}
              </Link>
              <span className='date'>
                {new Date(articleData?.data?.author.createdAt as string).toLocaleDateString()}
              </span>
            </div>
            {userData?.data?.data?.username === articleData?.data?.author?.username ? (
              <div className='actions'>
                <Button
                  type='button'
                  className='btn btn-delete'
                  onClick={() => handleDeleteArticle(articleData?.data?.slug as string)}
                >
                  Delete Article
                </Button>
                <Button type='button' className='btn btn-edit'>
                  Edit Article
                </Button>
              </div>
            ) : (
              <div className='actions'>
                <Button
                  type='button'
                  className='btn btn-follow'
                  onClick={() => handleFollowArticle(articleData?.data?.author?.username as string)}
                >
                  Follow {articleData?.data?.author?.username}
                </Button>
                <Button
                  type='button'
                  className='btn btn-favorite'
                  onClick={() =>
                    handleFavoriteArticle(articleData?.data?.slug as string, articleData?.data?.favourites)
                  }
                >
                  ({articleData?.data?.favourites.length || 0}) Favorite Article
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='article-detail-info'>
        <div className='article-content'>
          <div className='container'>
            <p className='content'>{articleData?.data?.content}</p>
            <ul className='tagList'>
              {articleData?.data?.tags.map((item: any) => (
                <li key={item.id} className='tagList-item'>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='article-action'>
          <div className='container'>
            <div className='article-meta'>
              <div className='info'>
                <Link className='author' to={path.home}>
                  {userData?.data?.data?.username}
                </Link>
                <span className='date'>August 12, 2024</span>
              </div>
              {userData?.data?.data?.username === articleData?.data?.author?.username ? (
                <div className='actions'>
                  {' '}
                  <Button
                    type='button'
                    className='btn btn-edit'
                    onClick={() => handleEditArticle(articleData?.data?.id as any)}
                  >
                    Delete Article
                  </Button>
                  <Button
                    type='button'
                    className='btn btn-delete'
                    onClick={() => handleDeleteArticle(articleData?.data?.id as any)}
                  >
                    Edit Article
                  </Button>
                </div>
              ) : (
                <div className='actions'>
                  {' '}
                  <Button
                    type='button'
                    className='btn btn-follow'
                    onClick={() => handleFollowArticle(userData?.data?.data?.id)}
                  >
                    Follow {articleData?.data?.author?.username}
                  </Button>
                  <Button
                    type='button'
                    className='btn btn-favorite'
                    onClick={() =>
                      handleFavoriteArticle(articleData?.data?.slug as string, articleData?.data?.favourites)
                    }
                  >
                    {articleData?.data?.favourites.length || 0} Favorite Article
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='article-comment'>
        <div className='container'>
          <form className='comment' action='' onSubmit={handleSubmit}>
            <div className='comment-top'>
              <textarea
                name='content'
                rows={10}
                cols={100}
                placeholder='Write a comment'
                value={formState.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className='comment-bottom'>
              <img
                src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAALCACAAIABAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAYBBAUHCAMC/8QANBAAAQQBAgQEBgEBCQAAAAAAAQACAwQFBhEHITFBCBJRYRMUcYGRoVIjFSJEYnJzgpKy/9oACAEBAAA/AJwiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi+69eW3YZBXiksWJOTIYWF73fQDmVKo+EmtpoPit0tkvJtvzjDT/wBSd/0o1kcbcxFt1W/Uno2m9YbMZjf9dirdERXmJwuQz9r5bGULORsDrHViMhH126fdZ+zwn1pTgM0ulskIwNyWxB5A+jST+lFXsdFK+KRjo5WHZ8b2lrmn0IPMKiIiLM6P0rd1tqOlhseAJ7Lucjhu2Jg5ue72A/J2Hddg6W0bprhJp+WSD4NOOJnmt5S24CST3c89B6NHL0Cjk/iU0NDcMIt3pmb7fMx03GP689iR9lI8yzR/E/R0tm7Yp5LBhjnm6HhprbDm4O6xuHvt7hcUTCMTyiF7pIQ9wje4bFzNz5SR2JGxXwivsFBRtZzHQ5Od1XGyWI2Wp2dY4i4Bzh6cu/bqu0pcjpPhRpiH+tTwuIA/pCPmZjt1AG7pHH15qMY/xI6Hu3BC67bpAnYT2qrmx/cjfYe5WY19w0wHFPDtlf8ABbcdH5qmXrbOcNxy3I5PYfQ/bYrjzOYS5pvM3MVkIvg3akpilaOm46EeoI2IPoVYoiLMaS1bk9E5yHLYmZsNqMFhD2+ZkjD1Y4dwdh+As7xF4tZviYKsWRbBUpVj52U6nmDHP/m7ckuI7eihSqHODHsDnBj9vO0OIDtum47/AHVERFVznODA5znBg8rA5xPlHoN+g+iop7w+40Z/hzjJ8dRZWu0XuL44LgcRA89SzYjkepb0358tyoln89f1RmbWVyc5s3rLvNJJtsOQ2AA7AAAAeyx6IiIiIiIiIiIiIi2Dwj4Rz8ULVyR93+z8ZTLWSzMaHyOe4bhrQeXTmSfZWPE3hblOGmT8lkG3ipnbVsi1uzX/AOV/8X+3ft7QxERbK4ScFrvEWUXrpmx2nmf4loAksO/jFuNtvV223Yb9sfxd4Yu4Y56vWjt/O0Lkbpa0jwBIA0gOa8DluNxzHXf2UFRERERSnh5xFynDfNfO0CJq0uzbVKR2zJ2j/wAuHPZ3b3C6x0prbTXFjByxVjDcZIzy2sXcYDJH7PYeo9HDce615qzwtYrISPn09kpMQ93P5Sy0zQD2ad/M0fcrX9zwy61rSEQjG3G9nR2vL+nNC9cd4YNYW3j5qfGY9ndz53SkfZref5WzdG+GfT2Bljs5iaTUNppBEUrPh1gf9sEl3/IkeykfEXi9geGtP5dzmXMqGAQYusQC0dvPtyjb+/QFclas1Zk9bZyfLZaf41qX+6Gt5MiYOjGDs0fvqeaxCIiIiIvWpbnoWo7NWeWrZiO8c8Dyx7D7OHMLaWm/Erq7CRsivCrnYW8t7TPhzbf62dfuCppW8WdQxj5nS9lsnf4Ftjm/sBed7xaR/DIo6XkL/W1cAH4a0qAao8QWstSxvhjuRYas7kY8awseR7yEl342WuHEue57iXPcfM5zjuXH1JPUqiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIv/9k='
                alt=''
              />
              <Button type='submit' className='btn btn-comment'>
                Post Comment
              </Button>
            </div>
          </form>
          <div className='comment'>
            {comment?.map((item: any) => (
              <div key={item.id}>
                <div className='comment-content'>
                  <p className='content'>{item.content}</p>
                </div>
                <div className='comment-bottom'>
                  <img
                    src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/wAALCACAAIABAREA/8QAHAABAAEFAQEAAAAAAAAAAAAAAAYBBAUHCAMC/8QANBAAAQQBAgQEBgEBCQAAAAAAAQACAwQFBhEHITFBCBJRYRMUcYGRoVIjFSJEYnJzgpKy/9oACAEBAAA/AJwiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIi+69eW3YZBXiksWJOTIYWF73fQDmVKo+EmtpoPit0tkvJtvzjDT/wBSd/0o1kcbcxFt1W/Uno2m9YbMZjf9dirdERXmJwuQz9r5bGULORsDrHViMhH126fdZ+zwn1pTgM0ulskIwNyWxB5A+jST+lFXsdFK+KRjo5WHZ8b2lrmn0IPMKiIiLM6P0rd1tqOlhseAJ7Lucjhu2Jg5ue72A/J2Hddg6W0bprhJp+WSD4NOOJnmt5S24CST3c89B6NHL0Cjk/iU0NDcMIt3pmb7fMx03GP689iR9lI8yzR/E/R0tm7Yp5LBhjnm6HhprbDm4O6xuHvt7hcUTCMTyiF7pIQ9wje4bFzNz5SR2JGxXwivsFBRtZzHQ5Od1XGyWI2Wp2dY4i4Bzh6cu/bqu0pcjpPhRpiH+tTwuIA/pCPmZjt1AG7pHH15qMY/xI6Hu3BC67bpAnYT2qrmx/cjfYe5WY19w0wHFPDtlf8ABbcdH5qmXrbOcNxy3I5PYfQ/bYrjzOYS5pvM3MVkIvg3akpilaOm46EeoI2IPoVYoiLMaS1bk9E5yHLYmZsNqMFhD2+ZkjD1Y4dwdh+As7xF4tZviYKsWRbBUpVj52U6nmDHP/m7ckuI7eihSqHODHsDnBj9vO0OIDtum47/AHVERFVznODA5znBg8rA5xPlHoN+g+iop7w+40Z/hzjJ8dRZWu0XuL44LgcRA89SzYjkepb0358tyoln89f1RmbWVyc5s3rLvNJJtsOQ2AA7AAAAeyx6IiIiIiIiIiIiIi2Dwj4Rz8ULVyR93+z8ZTLWSzMaHyOe4bhrQeXTmSfZWPE3hblOGmT8lkG3ipnbVsi1uzX/AOV/8X+3ft7QxERbK4ScFrvEWUXrpmx2nmf4loAksO/jFuNtvV223Yb9sfxd4Yu4Y56vWjt/O0Lkbpa0jwBIA0gOa8DluNxzHXf2UFRERERSnh5xFynDfNfO0CJq0uzbVKR2zJ2j/wAuHPZ3b3C6x0prbTXFjByxVjDcZIzy2sXcYDJH7PYeo9HDce615qzwtYrISPn09kpMQ93P5Sy0zQD2ad/M0fcrX9zwy61rSEQjG3G9nR2vL+nNC9cd4YNYW3j5qfGY9ndz53SkfZref5WzdG+GfT2Bljs5iaTUNppBEUrPh1gf9sEl3/IkeykfEXi9geGtP5dzmXMqGAQYusQC0dvPtyjb+/QFclas1Zk9bZyfLZaf41qX+6Gt5MiYOjGDs0fvqeaxCIiIiIvWpbnoWo7NWeWrZiO8c8Dyx7D7OHMLaWm/Erq7CRsivCrnYW8t7TPhzbf62dfuCppW8WdQxj5nS9lsnf4Ftjm/sBed7xaR/DIo6XkL/W1cAH4a0qAao8QWstSxvhjuRYas7kY8awseR7yEl342WuHEue57iXPcfM5zjuXH1JPUqiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIv/9k='
                    alt=''
                  />
                  <Button type='submit' className='btn btn-delete' onClick={() => handleDeleteComment(item?.id)}>
                    Delete Comment
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
