import axios from 'axios'
export const URL_SIGN_UP = 'http://localhost:3010/api/auth/sign-up'
export const URL_SIGN_IN = 'http://localhost:3010/api/auth/sign-in'
export const URL_GET_USER = 'http://localhost:3010/api/auth/user'
export const URL_LOGOUT = 'http://localhost:3010/api/auth/logout'
import { CurrenUserResponse, SignInResponse, SignUpResponse } from 'src/shared/types/auth.type'
import { axiosInstance } from './http.services'
const authApi = {
  signUp(body: { email: string; username: string; password: string }) {
    return axiosInstance.post<SignUpResponse>(URL_SIGN_UP, body, {
      headers: { 'No-Credentials': 'true' }
    })
  },
  signIn(body: { email: string; password: string }) {
    return axiosInstance.post<SignInResponse>(URL_SIGN_IN, body, {
      headers: { 'No-Credentials': 'true' }
    })
  },
  getCurrentUser() {
    return axiosInstance.get<CurrenUserResponse>(`auth/user`, { withCredentials: true })
  },
  logout() {
    return axiosInstance.get(URL_LOGOUT)
  }
}
export default authApi
