import { Link, useNavigate } from 'react-router-dom'
import path from 'src/shared/constants/path'
import './SignIn.scss'
import Button from 'src/shared/components/Button'
import Input from 'src/shared/components/Input/Input'
import useAuthForm from '../useAuthForm'
export default function SignIn() {
  const { formState, handleChange, handleSubmit } = useAuthForm('signIn')
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
