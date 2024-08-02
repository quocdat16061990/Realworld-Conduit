import React, { useState } from 'react'
import './NewArticle.scss'
import axios from 'axios'
const NewArticle = () => {
  const [formState, setFormState] = useState<any>({
    title: '',
    intro: '',
    desc: '',
    textarea: '',
    tag: ''
  })
  const handleSubmit = async (event: any) => {
    event.preventDefault()
  }
  const handleChange = (event: any) => {
    const { name, value } = event.target
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
        <input type='textarea' name='desc' value={formState.tags} onChange={handleChange} placeholder='Enter Tags' />

        <div className='btn'>
          <button>Publish Article</button>
        </div>
      </form>
    </div>
  )
}

export default NewArticle
