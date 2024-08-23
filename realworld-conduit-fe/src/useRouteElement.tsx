import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from './layout/MainLayout/MainLayout'
import path from 'src/shared/constants/path'
import AuthLayout from './layout/AuthLayout'

import { lazy, Suspense, useContext } from 'react'
import { AppContext } from './core/context/AppContext'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.signIn} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const SignIn = lazy(() => import('./features/Auth/Sign-In'))
const SignUp = lazy(() => import('./features/Auth/Sign-Up'))
const Article = lazy(() => import('./features/Article'))
const ArticleDetail = lazy(() => import('./features/Article/ArticleDetail'))
const NewArticle = lazy(() => import('./features/Article/New-Article'))
const EditArticle = lazy(() => import('./features/Article/EditArticle'))
const Profile = lazy(() => import('./features/Profile'))
const EditProfile = lazy(() => import('./features/Profile/EditProfile'))
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            {
              path: path.signIn,
              element: (
                <Suspense>
                  <SignIn />
                </Suspense>
              )
            },
            {
              path: path.signUp,
              element: (
                <Suspense>
                  <SignUp />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.article,
          element: (
            <MainLayout>
              <Suspense>
                <NewArticle />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.editArticle,
          element: (
            <MainLayout>
              <Suspense>
                <EditArticle />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Suspense>
                <Profile />
              </Suspense>
            </MainLayout>
          )
        },
        {
          path: path.editProfile,
          element: (
            <MainLayout>
              <Suspense>
                <EditProfile />
              </Suspense>
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          index: true,
          element: (
            <Suspense>
              <Article />
            </Suspense>
          )
        },
        {
          path: path.details,
          element: (
            <Suspense>
              <ArticleDetail />
            </Suspense>
          )
        }
      ]
    }
  ])

  return routeElement
}
