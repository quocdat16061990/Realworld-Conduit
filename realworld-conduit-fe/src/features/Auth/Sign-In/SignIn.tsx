import { Link, useNavigate } from 'react-router-dom'
import path from 'src/shared/constants/path'
import './SignIn.scss'
import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from 'src/core/context/AppContext'
import Button from 'src/shared/components/Button'
import Input from 'src/shared/components/Input/Input'
export default function SignIn() {
  const [formState, setFormState] = useState<any>({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        'http://localhost:3010/api/auth/sign-in',
        {
          email: formState.email,
          password: formState.password
        },
        {
          withCredentials: true
        }
      )
      if (response) {
        toast.success('Login Successfully', {
          autoClose: 1000
        })
        setIsAuthenticated(response.data.isAuthenticated)
        localStorage.setItem('isAuthenticated', response.data.isAuthenticated)
        navigate(path.home)
      }
    } catch (error) {}
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }
  return (
    <div className='sign-in'>
      <h3 className='heading-3'>Sign In</h3>
      <Link className='link' to={path.signUp}>
        Need a account
      </Link>
      <form className='form' onSubmit={handleSubmit}>
        <Input type='text' name='email' value={formState.email} onChange={handleChange} placeholder='Email' />
        <Input
          type='password'
          name='password'
          value={formState.password}
          onChange={handleChange}
          placeholder='Password'
        />
        <div className='form-btn'>
          <Button className='btn-sign-in' type='submit'>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}
