import React, { useState } from 'react'
import './NewArticle.scss'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import articlesApi from 'src/core/services/article.service'
const NewArticle = () => {
  const [formState, setFormState] = useState<any>({
    title: '',
    intro: '',
    desc: '',
    textarea: '',
    tag: ''
  })
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (content: any) => articlesApi.createNewArticles(content),
    onSuccess: (data: any) => {
      toast.success('Create Articles Successfully'), setFormState({ content: '' })
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to Create Articles')
    }
  })
  // const mutation = useMutation({
  //   mutationFn: (content: any) => articlesApi.postComment(convertColonsExceptFirst(slug as string), content),
  //   onSuccess: (data: any) => {
  //     toast.success('Comment posted successfully!')
  //     queryClient.invalidateQueries({ queryKey: ['comments', slug] })
  //     setFormState({ content: '' })
  //   },
  //   onError: (error: any) => {
  //     toast.error(error.message || 'Failed to post comment')
  //   }
  // })
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const body = {
      title: formState.title,
      intro: formState.intro,
      desc: formState.desc,
      textarea: formState.textarea,
      tag: formState.tags
    }
    mutation.mutate({...body,title,})
  }
  const handleChange = (event: any) => {
    const { name, value } = event.target
    if (name === 'tags') {
      const tagsArray = value.split(',').map((tag: string) => tag.trim())
      setFormState((prevState: any) => ({
        ...prevState,
        [name]: tagsArray
      }))
    }
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <div className='new-article'>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' name='title' value={formState.title} onChange={handleChange} placeholder='Article Title' />
        <input
          type='text'
          name='intro'
          value={formState.intro}
          onChange={handleChange}
          placeholder='What is this article about ? '
        />
        <input
          type='text'
          name='desc'
          value={formState.desc}
          onChange={handleChange}
          placeholder='Write your article'
        />
        <input
          type='textarea'
          name='textarea'
          value={formState.textarea}
          onChange={handleChange}
          placeholder='Enter Tags'
        />
        <input type='text' name='tags' value={formState.tags} onChange={handleChange} placeholder='Enter Tags' />
        <div className='btn'>
          <button>Publish Article</button>
        </div>
      </form>
    </div>
  )
}

export default NewArticle
