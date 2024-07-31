import path from 'src/shared/constants/path'
import { Link } from 'react-router-dom'
import Button from 'src/shared/components/Button'
import './SignUp.scss'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Input from 'src/shared/components/Input/Input'
export default function SignUp() {
  const [formState, setFormState] = useState<any>({
    username: '',
    email: '',
    password: ''
  })
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:3010/api/auth/sign-up', {
        email: formState.email,
        username: formState.username,
        password: formState.password
      })
      if (response) {
        toast.success('Register Successfully')
      }
    } catch (error) {
      console.log('error: ', error)
    }
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
