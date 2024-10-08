import React, { useState } from 'react'
import Tabs from 'src/shared/components/Tabs/Tabs'
import Tags from './Tags/Tags'
import './Article.scss'
import Articles from './Articles/Articles'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import articlesApi from 'src/core/services/article.service'
import authApi from 'src/core/services/auth.service'
import { useArticles } from './useArticle'

export default function Article() {
  const [selectedTag, setSelectedTag] = useState<any>(null)
  const { userData, articleData, handleTagClick, isAuthenticated } = useArticles(selectedTag)
  const yourArticlesFeed = articleData?.data?.enhancedArticles.filter(
    (item: any) => item.author.username === userData?.data?.data?.username
  )

  const globalArticles = articleData?.data?.enhancedArticles

  const tabsData = [
    {
      title: 'Global Feed',
      content: <Articles articles={globalArticles} />
    }
  ]

  if (isAuthenticated) {
    tabsData.push({
      title: 'Your Feed',
      content: <Articles articles={yourArticlesFeed} />
    })
  }
  if (selectedTag) {
    tabsData.push({
      title: `#${selectedTag}`,
      content: <Articles articles={globalArticles} />
    })
  }
  return (
    <div className='posts'>
      <div className='post'>
        <Tabs tabs={tabsData} />
        <Tags onTagClick={handleTagClick} />
      </div>
    </div>
  )
}
