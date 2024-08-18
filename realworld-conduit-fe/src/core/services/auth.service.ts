import axios from 'axios'
export const URL_SIGN_UP = 'http://localhost:3010/api/auth/sign-up'
export const URL_SIGN_IN = 'http://localhost:3010/api/auth/sign-in'
export const URL_GET_USER = 'http://localhost:3010/api/auth/user'
export const URL_LOGOUT = 'http://localhost:3010/api/auth/logout'
const authApi = {
  signUp(body: { email: string; username: string; password: string }) {
    return axios.post<any>(URL_SIGN_UP, body)
  },
  signIn(body: { email: string; password: string }) {
    return axios.post<any>(URL_SIGN_IN, body, { withCredentials: true })
  },
  getCurrentUser() {
    return axios.get<any>(URL_GET_USER, { withCredentials: true })
  },
  logout() {
    return axios.get<any>(URL_LOGOUT, { withCredentials: true })
  }
}
export default authApi
