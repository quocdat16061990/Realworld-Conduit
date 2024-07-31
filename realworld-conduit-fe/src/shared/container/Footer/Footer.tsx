import React from 'react'
import { Link } from 'react-router-dom'
import path from 'src/shared/constants/path'
import './Footer.scss'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <Link className='footer-link' to={path.home}>
          Conduit
        </Link>
        <span className='footer-span'>
          <Link className='footer-span-link' to={'https://thinkster.io/'}>
            Interactive learning project from Thinkster. Code & design licensed under MIT.
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Footer
