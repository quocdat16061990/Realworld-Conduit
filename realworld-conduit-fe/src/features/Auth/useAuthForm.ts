import { useMutation } from '@tanstack/react-query'
import path from 'src/shared/constants/path'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/core/services/auth.service'
import { AppContext } from 'src/core/context/AppContext'

interface SignInFormState {
  email: string
  password: string
}

interface SignUpFormState extends SignInFormState {
  username: string
}

type AuthType = 'signIn' | 'signUp'

type FormState = AuthType extends 'signIn' ? SignInFormState : SignUpFormState

const useAuthForm = (authType: AuthType) => {
  const [formState, setFormState] = useState<FormState>({
    username: authType === 'signIn' ? '' : '',
    email: '',
    password: ''
  })
  const { setIsAuthenticated } = useContext(AppContext)
  const navigate = useNavigate()

  const mutationFn = authType === 'signUp' ? authApi.signUp : authApi.signIn
  const mutation = useMutation({
    mutationFn: (body: FormState) => mutationFn(body),
    onSuccess: (data: any) => {
      toast.success(data.data.message)
      if (authType === 'signIn') {
        setIsAuthenticated(data?.data?.isAuthenticated)
        localStorage.setItem('isAuthenticated', JSON.stringify(data?.data?.isAuthenticated))
      }
    },
    onError: (error: any) => {
      toast.error(error.message)
    }
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState((prevState: FormState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(formState)
    if (authType === 'signUp') {
      navigate(path.signIn)
    }
    if (authType === 'signIn') {
      navigate(path.home)
    }
  }

  return { formState, handleChange, handleSubmit }
}

export default useAuthForm
