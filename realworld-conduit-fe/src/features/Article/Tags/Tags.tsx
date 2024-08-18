import React from 'react'
import './Tags.scss'
import tagsApi from 'src/core/services/tags.service'
import { useQuery } from '@tanstack/react-query'

const Tags = ({ onTagClick }: any) => {
  const {
    data: tagsData,
    isLoading: tagsLoading,
    error: tagsError
  } = useQuery({
    queryKey: ['tags'],
    queryFn: () => tagsApi.getAllTags()
  })
  if (tagsLoading) return <div>Loading tags...</div>
  if (tagsError) return <div>Error fetching tags</div>

  return (
    <div className='tags'>
      <h4 className='tag-title'>Popular Tags</h4>
      <div className='tagList'>
        {tagsData?.data.map((tag: any) => (
          <button onClick={() => onTagClick(tag.name)} key={tag.id} className='tag'>
            {tag.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tags
