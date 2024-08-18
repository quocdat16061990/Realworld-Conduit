import React, { useState } from 'react'
import './Profile.scss'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import authApi from 'src/core/services/auth.service'
import Tabs from 'src/shared/components/Tabs/Tabs'
import Post from '../Article/Post'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/shared/constants/path'
import Button from 'src/shared/components/Button'
import articlesApi from 'src/core/services/article.service'
import Articles from '../Article/Articles/Articles'
const Profile = () => {
  const {
    status: userStatus,
    data: userData,
    error: userError
  } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: authApi.getCurrentUser
  })
  console.log('userData: ', userData)
  const {
    status: articlesStatus,
    data: articleData,
    error: articlesError
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => articlesApi.articles({}),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5
  })
  const navigate = useNavigate()
  const yourArticles = articleData?.data?.enhancedArticles.filter(
    (item: any) => item.author.username === userData?.data?.data?.username
  )
  const favoriteArticles = articleData?.data?.enhancedArticles.filter((item: any) => item.favorite === true)
  const tabsData = [
    {
      title: 'Your Article',
      content: <Articles articles={yourArticles} />
    },
    {
      title: 'Favorites Article',
      content: <Articles articles={favoriteArticles} />
    }
  ]
  const handleEditProfile = (id: number) => {
    console.log('id: ', id)
    navigate(`/profile/:${id}`)
  }
  return (
    <div className='profile'>
      <div className='profile-info'>
        <div className='profile-top'>
          <div>
            <img src='https://api.realworld.io/images/smiley-cyrus.jpeg' alt='avatar' />
          </div>
          <h4>Quoc Dat</h4>
        </div>
        <Button type='button' className=' btn-sign-up' onClick={() => handleEditProfile(userData?.data?.data?.id)}>
          Edit Your Profile
        </Button>
      </div>
      <div className='profile-content'>
        <Tabs tabs={tabsData} />
      </div>
    </div>
  )
}

export default Profile
