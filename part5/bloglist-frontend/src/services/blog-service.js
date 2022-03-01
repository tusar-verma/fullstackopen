import axios from 'axios'

const baseURL = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  // const blogs = axios.get(baseURL).then(response => response.data)
  const blogs = await axios.get(baseURL)
  return blogs
}

const create = async (blogdata) => {
  const config = {
    headers: { Authorization: token }
  }
  const result = await axios.post(baseURL, blogdata, config)
  return result
}

const updateLike = async (id, blogdata) => {
  const result = await axios.put(`${baseURL}/${id}`, blogdata)
  return result
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const result = await axios.delete(`${baseURL}/${id}`, config)
  return result
}

export default { getAll, create, setToken, updateLike, deleteBlog }