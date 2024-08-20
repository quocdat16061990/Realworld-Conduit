import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

// Tạo một instance của axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3010/api'
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.withCredentials = true

    if (config.headers && 'No-Credentials' in config.headers) {
      config.withCredentials = false
      delete config.headers['No-Credentials']
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Xử lý response data nếu cần
    return response
  },
  (error: AxiosError) => {
    // Xử lý lỗi chung
    if (error.response) {
      console.log('error: ', error)
      switch (error.response.status) {
        case 401:
          // Xử lý lỗi unauthorized
          console.log('Unauthorized')
          break
        case 404:
          // Xử lý lỗi not found
          console.log('Not Found')
          break
        default:
          console.log('An error occurred')
      }
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      console.log('No response received')
    } else {
      // Có lỗi khi set up request
      console.log('Error', error.message)
    }
    return Promise.reject(error)
  }
)
