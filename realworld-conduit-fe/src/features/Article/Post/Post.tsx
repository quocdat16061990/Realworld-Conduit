import React, { useEffect, useState } from 'react'
import './Post.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import favoriteApi from 'src/core/services/favorite.service'
import articlesApi from 'src/core/services/article.service'
import commentApi from 'src/core/services/comment.service'
const Post = ({ data }: any) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const handleClickArticle = (slug: string) => {
    navigate(`/article-detail/:${slug}`)
  }

  const favoriteMutation = useMutation({
    mutationFn: (slug: string) => favoriteApi.favoriteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })
  const unfavoriteMutation = useMutation({
    mutationFn: (slug: string) => favoriteApi.unFavoriteArticle(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  })
  const handleFavoriteArticle = (slug: string, favorite: boolean) => {
    if (favorite) {
      unfavoriteMutation.mutate(slug)
    } else {
      favoriteMutation.mutate(slug)
    }
  }
  return (
    <div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                {data.author.username}
              </Link>
              <span className='date'>{new Date(data?.author.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className='article-follow'>
            <button onClick={() => handleFavoriteArticle(data?.slug, data?.favorite)}>
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth={0}
                viewBox='0 0 512 512'
                height={16}
                width={16}
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M256 448a32 32 0 0 1-18-5.57c-78.59-53.35-112.62-89.93-131.39-112.8-40-48.75-59.15-98.8-58.61-153C48.63 114.52 98.46 64 159.08 64c44.08 0 74.61 24.83 92.39 45.51a6 6 0 0 0 9.06 0C278.31 88.81 308.84 64 352.92 64c60.62 0 110.45 50.52 111.08 112.64.54 54.21-18.63 104.26-58.61 153-18.77 22.87-52.8 59.45-131.39 112.8a32 32 0 0 1-18 5.56z' />
              </svg>
              {data?.favoritesCount}
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>{data?.title}</h3>
          <p className='desc'>{data?.description}</p>
        </div>
        <div className='article-tags'>
          <span className='read-more' onClick={() => handleClickArticle(data?.slug)}>
            Read more...
          </span>

          <ul className='tagList'>
            {data?.tags.map((item: any) => (
              <li key={item.id} className='tagList-item'>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Post
