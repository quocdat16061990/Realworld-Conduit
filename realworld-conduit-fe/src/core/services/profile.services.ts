import axios from 'axios'
import { axiosInstance } from './http.services'

const profileApi = {
  follow(username: string) {
    return axiosInstance.post<any>(`profiles/${username}/follow`, {})
  },
  unfollow(username: string) {
    return axiosInstance.delete(`profiles/${username}/unfollow`, {})
  },
  updateProfile(email: string, data: any) {
    return axiosInstance.patch<any>(`profiles/${encodeURIComponent(email)}/update-profile`, data)
  },
  getProfile() {
    return axiosInstance.get<any>(`profiles/profile`)
  }
}

export default profileApi
