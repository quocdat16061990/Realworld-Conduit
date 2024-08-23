import React, { ChangeEvent, useState, useEffect } from 'react'
import './EditArticle.scss'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import articlesApi from 'src/core/services/article.service'
import Input from 'src/shared/components/Input/Input'
import Button from 'src/shared/components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import path from 'src/shared/constants/path'
import { CreateArticleRequest, Tag } from 'src/shared/types/article.type'

const EditArticle = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const newSlug = slug?.substring(1)

  const {
    data: articleData,
    isLoading: articleLoading,
    error: articleError
  } = useQuery({
    queryKey: ['articles', newSlug],
    queryFn: () => articlesApi.getArticleBySlug(newSlug as string),
    enabled: !!newSlug
  })

  const [formState, setFormState] = useState<CreateArticleRequest>({
    title: '',
    description: '',
    content: '',
    tags: []
  })

  useEffect(() => {
    if (articleData?.data) {
      const extractedTags: any = articleData?.data?.tags?.map((tag: any) => tag.name)
      console.log(extractedTags)
      setFormState({
        title: articleData.data.title || '',
        description: articleData.data.description || '',
        content: articleData.data.content || '',
        tags: extractedTags || []
      })
    }
  }, [articleData])

  const handleSubmit = async (event: React.FormEvent) => {
    console.log('formState: ', formState)
    event.preventDefault()
    editArticleMutation.mutate(formState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    if (name === 'tags') {
      const tagsArray = value.split(',').map((tag) => tag.trim())
      setFormState((prevState: any) => ({
        ...prevState,
        tags: tagsArray
      }))
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const editArticleMutation = useMutation({
    mutationFn: (body: CreateArticleRequest) => articlesApi.updateArticle(newSlug as string, body),
    onSuccess: () => {
      toast.success('Cập nhật bài viết thành công')
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      navigate(path.home)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Cập nhật bài viết thất bại')
    }
  })

  if (articleLoading) return <div>Đang tải...</div>
  if (articleError) return <div>Có lỗi khi tải bài viết</div>

  return (
    <div className='edit-article'>
      <form className='form' onSubmit={handleSubmit}>
        <Input
          type='text'
          name='title'
          value={formState.title}
          onChange={handleChange}
          placeholder='Tiêu đề bài viết'
        />
        <Input
          type='text'
          name='description'
          value={formState.description}
          onChange={handleChange}
          placeholder='Mô tả ngắn về bài viết'
        />
        <Input
          type='text'
          name='content'
          value={formState.content}
          onChange={handleChange}
          placeholder='Nội dung bài viết'
        />
        <Input
          type='text'
          name='tags'
          value={formState.tags?.join(',')}
          onChange={handleChange}
          placeholder='Enter Tags'
        />

        <div className='btn'>
          <Button className='edit' type='submit'>
            Cập nhật bài viết
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditArticle
