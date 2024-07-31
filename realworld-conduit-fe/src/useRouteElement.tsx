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
const NewArticle = lazy(() => import('./features/Article/New-Article'))
const Profile = lazy(() => import('./features/Profile'))
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
          path: path.profile,
          element: (
            <MainLayout>
              <Suspense>
                <Profile />
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
        }
      ]
    }
  ])

  return routeElement
}
