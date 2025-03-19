import { axiosInstance } from "./http.services";
export const URL_TAGS = "http://localhost:3010/api/tags";
const tagsApi = {
  getAllTags() {
    return axiosInstance.get<any>(`/tags`, {
      headers: { "No-Credentials": "true" },
    });
  },
};
export default tagsApi;
