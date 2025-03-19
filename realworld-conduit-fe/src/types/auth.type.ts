export interface SignInResponse {
    isAuthenticated: boolean
    message: string
  }
  export interface SignUpResponse {
    data: SignUp
    status: number
  }
  export interface SignUp {
    avatar: string | null
    createdAt: string
    email: string
    id: string
    updateAt: string
    username: string
  }
  export interface CurrenUserResponse {
    data: Profile
    status: number
  }
  export interface Profile {
    password: string
    id: number
    email: string
    username: string
    avatar: string | null
    shortBio: string | null
    createdAt: string
    updatedAt: string
  }