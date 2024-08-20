import { axiosInstance } from './http.services'

const profileApi = {
  follow(username: string) {
    return axiosInstance.post<any>(`profiles/${username}/follow`, {})
  },
  unfollow(username: string) {
    return axiosInstance.delete(`profiles/${username}/unfollow`, {})
  },
  updateProfile(username: string, data: any) {
    return axiosInstance.put<any>(`profiles/${username}/update-profile`, data)
  }
}

export default profileApi
