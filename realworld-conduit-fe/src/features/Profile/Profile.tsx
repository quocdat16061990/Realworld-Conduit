import React, { useState } from 'react'
import './Profile.scss'
import axios from 'axios'
const Profile = () => {
  const [formState, setFormState] = useState<any>({
    url: '',
    username: '',
    bio: '',
    email: '',
    password: ''
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

  const formFields = [
    { name: 'url', type: 'text', placeholder: 'Article Title' },
    { name: 'username', type: 'text', placeholder: 'URL Profile your picture' },
    { name: 'bio', type: 'textarea', placeholder: 'Short bio about you' },
    { name: 'email', type: 'text', placeholder: 'Email' },
    { name: 'password', type: 'password', placeholder: 'Password' }
  ]
  return (
    <div className='profile'>
      <form className='form' onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={formState[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
        ))}
        <div className='btn'>
          <button>Publish Article</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
