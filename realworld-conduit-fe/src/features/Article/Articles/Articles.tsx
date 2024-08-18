import React from 'react'
import './Articles.scss'
import Post from '../Post'
import { useQuery } from '@tanstack/react-query'
import articlesApi from 'src/core/services/article.service'

const Articles = ({ articles }: any) => {
  const articleList = articles
  return <div>{articleList?.map((item: any) => <Post key={item.id} data={item} />)}</div>
}

export default Articles
