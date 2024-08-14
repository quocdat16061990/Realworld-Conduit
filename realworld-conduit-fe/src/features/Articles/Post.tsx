import React from 'react'
import Tabs from 'src/shared/components/Tabs/Tabs'
import ArticleDetail from './Article/Article'
import Tags from './Tags/Tags'
import './Post.scss'
import { useQuery } from '@tanstack/react-query'
import authApi from 'src/core/services/auth.service'
export default function Post() {
  const { status, data, error } = useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: authApi.getCurrentUser
  })
  const tabsData = [
    {
      title: 'Global Feed',
      content: <ArticleDetail />
    },
    {
      title: 'Your Feed',
      content: <ArticleDetail isYourFeed={true} currentUser={data?.data?.data?.username} />
    }
  ]

  return (
    <div className='posts'>
      <div className='post'>
        <Tabs tabs={tabsData} />
        <Tags />
      </div>
    </div>
  )
}
