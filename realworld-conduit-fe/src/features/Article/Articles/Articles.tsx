import React from 'react'
import './Articles.scss'
import Post from '../Post'

const Articles = ({ articles }: any) => {
  const articleList = articles
  return <div>{articleList?.map((item: any) => <Post key={item.id} data={item} />)}</div>
}

export default Articles
