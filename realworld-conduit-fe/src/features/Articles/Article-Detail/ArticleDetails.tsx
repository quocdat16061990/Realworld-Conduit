import React, { useState } from 'react'
import './Article-Details.scss'
import { Link, useParams } from 'react-router-dom'
import Button from 'src/shared/components/Button'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import articlesApi from 'src/core/services/article.service'
import { toast } from 'react-toastify'
import authApi from 'src/core/services/auth.service'
const ArticleDetails = () => {
  const [formState, setFormState] = useState<{ content: string }>({
    content: ''
  })
  const queryClient = useQueryClient()
  const { slug } = useParams()

  function convertColonsExceptFirst(url: string): string {
    let firstColonRemoved = false
    return url.replace(/:/g, (match, offset) => {
      if (!firstColonRemoved) {
        firstColonRemoved = true
        return ''
      }
      return '%3A'
    })
  }

  const {
    data: articleData,
    isLoading: articleLoading,
    error: articleError
  } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getArticleBySlug(convertColonsExceptFirst(slug as string))
  })
  console.log('articleData:', articleData?.data?.favourites.length)
  const {
    data: userData,
    isLoading: userLoading,
    error: userError
  } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: () => authApi.getCurrentUser()
  })
  console.log('userData: ', userData?.data?.data?.username)
  const { data: commentsData, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', slug],
    queryFn: () => articlesApi.getComment(convertColonsExceptFirst(slug as string)),
    enabled: !!slug
  })

  const comment = commentsData?.data?.comments

  const mutation = useMutation({
    mutationFn: (content: string) => articlesApi.postComment(convertColonsExceptFirst(slug as string), content),
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
    mutationFn: (commentId: number) => articlesApi.deleteComment(convertColonsExceptFirst(slug as string), commentId),
    onSuccess: (data: any) => {
      toast.success(data?.data?.message)
      queryClient.invalidateQueries({ queryKey: ['comments', slug] })
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
      mutation.mutate(formState.content)
    }
  }

  const handleDelete = (id: number) => {
    deleteCommentMutation.mutate(id)
  }

  if (articleLoading || userLoading) return <div>Loading...</div>
  if (articleError || userError) return <div>Error occurred</div>
  return (
    <div className='article-detail'>
      <div className='detail-title'>
        <div className='container'>
          <h3 className='heading'>{articleData?.data?.title}</h3>
          <div className='details-profile'>
            <div className='article-info'>
              <Link className='article-avatar' to={'/'}>
                <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
              </Link>
              <div className='article-info-user'>
                <Link className='name' to={'/'}>
                  {articleData?.data?.author?.username}
                </Link>
                <span className='date'>{new Date(articleData?.data?.author.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className='article-action'>
              {userData?.data?.data?.username === articleData?.data?.author?.username ? (
                <div className='article-auth'>
                  <button className='btn-edit'>Edit Article</button>
                  <button className='btn-delete'>Delete Article</button>
                </div>
              ) : (
                <div className='article-unauth'>
                  <button className='btn-follow'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      stroke-width='0'
                      viewBox='0 0 512 512'
                      height='16'
                      width='16'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill='none'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        stroke-width='32'
                        d='M256 112v288m144-144H112'
                      ></path>
                    </svg>
                    Following User
                  </button>
                  <button className='btn-favorite'>
                    <svg
                      stroke='currentColor'
                      fill='currentColor'
                      strokeWidth={0}
                      viewBox='0 0 512 512'
                      height={16}
                      width={16}
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M256 448a32 32 0 0 1-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 0 0 9.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 0 1-18 5.56z' />
                    </svg>
                    Favorite Article
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='details-content '>
        <p>{articleData?.data?.content}</p>
        <div className='tagList'>
          {articleData?.data?.tags?.map((item: any) => {
            return <li key={item.id}>{item.name}</li>
          })}
        </div>
      </div>

      <form className='details-action' onSubmit={handleSubmit}>
        <div className='card-block'>
          <textarea
            className='comment'
            name='content'
            id=''
            rows={3}
            placeholder='Write a comment'
            value={formState.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className='card-footer'>
          <img src='https://api.realworld.io/images/smiley-cyrus.jpeg' alt='smiley-cyrus' />
          <Button className='btn-comment' type='submit'>
            Post Comment
          </Button>
        </div>
      </form>
      {comment &&
        comment.map((item: any) => {
          return (
            <div key={item.id} className='details-action'>
              <div className='card-block'>
                <p className='comment'>{item.content}</p>
              </div>
              <div className='card-footer'>
                <div>
                  <p>{commentsData?.data?.author?.username}</p>
                  <p>{new Date(item?.createdAt).toLocaleDateString()}</p>
                </div>

                <Button className='btn-danger' type='submit' onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default ArticleDetails
