import axios from 'axios'

export const URL_PROFILE = 'http://localhost:3010/api/profiles'

const profileApi = {
  follow(username: string) {
    return axios.post(`${URL_PROFILE}/${username}/follow`, {}, { withCredentials: true })
  },
  unfollow(username: string) {
    return axios.post(`${URL_PROFILE}/${username}/unfollow`, {}, { withCredentials: true })
  },
  updateProfile(username: string, data: any) {
    return axios.put<any>(`${URL_PROFILE}/${username}/update-profile`, data, { withCredentials: true })
  }
}

export default profileApi
