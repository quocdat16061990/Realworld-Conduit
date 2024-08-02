import React from 'react'
import Tabs from 'src/shared/components/Tabs/Tabs'
import ArticleDetail from './Article-Detail/ArticleDetail'
import Tags from './Tags/Tags'
import './Article.scss'
export default function Article() {
  const tabsData = [
    {
      title: 'Global Feed',
      content: <ArticleDetail />
    },
    {
      title: 'Your Feed',
      content: <div>Nội dung Tab 2</div>
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
