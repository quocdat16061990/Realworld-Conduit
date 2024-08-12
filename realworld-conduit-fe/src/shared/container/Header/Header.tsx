import React, { useContext, useEffect, useState } from 'react'
import path from 'src/shared/constants/path'
import { Link, useLocation } from 'react-router-dom'
import './Header.scss'
import axios from 'axios'
import { AppContext } from 'src/core/context/AppContext'

const Header = () => {
  const location = useLocation()
  const { isAuthenticated } = useContext(AppContext)
  const nonAuthMenu = [
    { id: 1, path: path.home, label: 'Home' },
    { id: 2, path: path.signIn, label: 'Sign In' },
    { id: 3, path: path.signUp, label: 'Sign Up' }
  ]

  const authMenu = [
    { id: 1, path: path.home, label: 'Home' },
    { id: 2, path: path.article, label: 'New Article' },
    { id: 3, path: path.profile, label: 'Profile' }
  ]

  const currentMenu = isAuthenticated ? authMenu : nonAuthMenu

  return (
    <div className='header'>
      <Link className='header-link' to={path.home}>
        Conduit
      </Link>
      <ul className='header-menu'>
        {currentMenu.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <li key={item.id}>
              <Link className={`menu-link ${isActive ? 'active' : ''}`} to={item.path}>
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Header
