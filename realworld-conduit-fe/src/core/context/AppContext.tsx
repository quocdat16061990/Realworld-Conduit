import Cookies from 'js-cookie'
import { createContext, useEffect, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  reset: () => void
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  reset: () => null
})
const initialAppContext = getInitialAppContext()
export const AppContext = createContext<AppContextInterface>(initialAppContext)
export const AppProvider = ({
  children,
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const initialIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false')

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated')
    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated))
    }
  }, [])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialIsAuthenticated)
  const reset = () => {
    setIsAuthenticated(false)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,

        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
