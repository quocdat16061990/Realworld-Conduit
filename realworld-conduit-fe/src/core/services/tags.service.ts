import axios from 'axios'
export const URL_TAGS = 'http://localhost:3010/api/tags'
const tagsApi = {
  getAllTags() {
    return axios.get<any>(`${URL_TAGS}`)
  }
}
export default tagsApi
