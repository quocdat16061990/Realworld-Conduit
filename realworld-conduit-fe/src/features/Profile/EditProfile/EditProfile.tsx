import React, { ChangeEvent, useState } from 'react'
import './EditProfile.scss'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import articlesApi from 'src/core/services/article.service'
import Input from 'src/shared/components/Input/Input'
import Button from 'src/shared/components/Button'
import { useNavigate } from 'react-router-dom'
import path from 'src/shared/constants/path'
import profileApi from 'src/core/services/profile.services'
import authApi from 'src/core/services/auth.service'

interface FormState {
  avatar: string
  username: string
  shortBio: string
  email: string
  password: string
}

const EditProfile = () => {
  const [formState, setFormState] = useState<FormState>({
    avatar: '',
    username: '',
    shortBio: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const {
    status: userStatus,
    data: userData,
    error: userError
  } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: authApi.getCurrentUser
  })
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    updateProfileMutation.mutate(formState)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const updateProfileMutation = useMutation({
    mutationFn: (body: FormState) => profileApi.updateProfile(userData?.data?.data?.email, body),
    onSuccess: () => {
      toast.success('Update Profile Successfully')
      setFormState({ avatar: '', username: '', shortBio: '', email: '', password: '' })
      navigate(path.home)
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to Create Articles')
    }
  })
  const handleLogout = () => {}
  return (
    <div className='editProfile'>
      <h1 className='heading'>Your Setting</h1>
      <form className='form' onSubmit={handleSubmit}>
        <Input
          type='text'
          name='avatar'
          value={formState.avatar}
          onChange={handleChange}
          placeholder='https://api.realworld.io/images/smiley-cyrus.jpeg'
        />
        <Input type='text' name='username' value={formState.username} onChange={handleChange} placeholder='quocdat16' />
        <Input
          type='text'
          name='shortBio'
          value={formState.shortBio}
          onChange={handleChange}
          placeholder='Short Bio About You'
        />
        <Input type='text' name='email' value={formState.email} onChange={handleChange} placeholder='Email' />
        <Input type='text' name='password' value={formState.password} onChange={handleChange} placeholder='Password' />
        <div className='btn'>
          <Button className='btn-sign-up' type='submit'>
            Edit Profile
          </Button>
        </div>
      </form>

      <Button className=' btn-logout' type='button'>
        Or Click Here to Logout
      </Button>
    </div>
  )
}

export default EditProfile
