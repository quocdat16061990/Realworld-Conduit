import React, { useEffect, useState } from 'react'
import './ArticleDetail.scss'
import { Link } from 'react-router-dom'
const ArticleDetail = () => {
  const [data, setData] = useState<any>()

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
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
      <div className='article-detail'>
        <div className='article-user'>
          <div className='article-info'>
            <Link className='article-avatar' to={'/'}>
              <img className='image' src='https://api.realworld.io/images/demo-avatar.png' alt='avatar.png' />
            </Link>
            <div className='article-info-user'>
              <Link className='name' to={'/'}>
                Maskim Estaban
              </Link>
              <span className='date'>January 4, 2024</span>
            </div>
          </div>
          <div className='article-follow'>
            <button>
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
              809
            </button>
          </div>
        </div>
        <div className='article-content'>
          <h3 className='title'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, numquam placeat.
          </h3>
          <p className='desc'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat atque ea officiis veniam eius recusandae
            adipisci repellat quidem. Voluptas, iure.
          </p>
        </div>
        <div className='article-tags'>
          <span className='read-more'>Read more...</span>
          <ul className='tagList'>
            <li className='tagList-item'>abc</li>
            <li className='tagList-item'>def</li>
            <li className='tagList-item'>xyz</li>
            <li className='tagList-item'>ght</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
