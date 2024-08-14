import path from 'src/shared/constants/path'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'src/shared/components/Button'
import './SignUp.scss'
import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Input from 'src/shared/components/Input/Input'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/core/services/auth.service'
import { AppContext } from 'src/core/context/AppContext'
export default function SignUp() {
  const [formState, setFormState] = useState<any>({
    username: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const signUpMutation = useMutation({
    mutationFn: (body: any) => authApi.signUp(body),
    onSuccess: (data: any) => {},
    onError: (error: any) => {}
  })
  const handleSubmit = (event: any) => {
    event.preventDefault()
    const body: any = {
      username: formState.username,
      email: formState.email,
      password: formState.password
    }
    signUpMutation.mutate(body)
    navigate(path.signIn)
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <div className='sign-up'>
      <h3 className='heading-3'>Sign Up</h3>
      <Link className='link' to={path.signIn}>
        Have an account ?
      </Link>
      <form onSubmit={handleSubmit} className='form'>
        <Input type='text' name='username' value={formState.username} onChange={handleChange} placeholder='Username' />
        <Input type='text' name='email' value={formState.email} onChange={handleChange} placeholder='Email' />
        <Input
          type='password'
          name='password'
          value={formState.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <div className='form-btn'>
          <Button type='submit' className='btn-sign-up'>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
}
