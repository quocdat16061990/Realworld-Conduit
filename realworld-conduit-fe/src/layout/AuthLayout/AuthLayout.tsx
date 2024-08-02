import Footer from 'src/shared/container/Footer'
import Header from 'src/shared/container/Header'
import './AuthLayout.scss'
import { Outlet } from 'react-router-dom'
interface Props {
  children?: React.ReactNode
}
export default function AuthLayout({ children }: Props) {
  return (
    <div className='authLayout'>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}
