import Footer from 'src/shared/container/Footer'
import Header from 'src/shared/container/Header'
import './MainLayout.scss'
import Banner from 'src/shared/container/Banner'
import { Outlet } from 'react-router-dom'
interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div className='mainLayout'>
      <Header />
      <Banner />
      {children}
      <Outlet />
      <Footer />
    </div>
  )
}
