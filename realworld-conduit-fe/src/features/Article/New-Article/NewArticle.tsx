import React, { ChangeEvent, useState } from 'react'
import './NewArticle.scss'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import articlesApi from 'src/core/services/article.service'
import Input from 'src/shared/components/Input/Input'
import Button from 'src/shared/components/Button'
import { useNavigate } from 'react-router-dom'
import path from 'src/shared/constants/path'

interface FormState {
  title: string
  description: string
  content: string
  tags: string[]
}

const NewArticle = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    content: '',
    tags: []
  })
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    createArticleMutation.mutate(formState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'tags') {
      const tagsArray = value.split(',').map((tag) => tag.trim())
      setFormState((prevState) => ({
        ...prevState,
        [name]: tagsArray
      }))
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  const createArticleMutation = useMutation({
    mutationFn: (body: FormState) => articlesApi.createNewArticles(body),
    onSuccess: () => {
      toast.success('Create Articles Successfully')
      setFormState({ title: '', description: '', content: '', tags: [] })
      navigate(path.home)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to Create Articles')
    }
  })

  return (
    <div className='new-article'>
      <form className='form' onSubmit={handleSubmit}>
        <Input type='text' name='title' value={formState.title} onChange={handleChange} placeholder='Article Title' />
        <Input
          type='text'
          name='description'
          value={formState.description}
          onChange={handleChange}
          placeholder='What is this article about?'
        />
        <Input
          type='text'
          name='content'
          value={formState.content}
          onChange={handleChange}
          placeholder='Write your article'
        />
        <Input
          type='text'
          name='tags'
          value={formState.tags.join(',')}
          onChange={handleChange}
          placeholder='Enter Tags'
        />

        <div className='btn'>
          <Button className='sign-up' type='submit'>
            Publish Article
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewArticle
