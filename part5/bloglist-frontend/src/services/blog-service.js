import axios from 'axios'

const baseURL = '/api/blogs'

const getAll = async () => {
    // const blogs = axios.get(baseURL).then(response => response.data)
    const blogs = await axios.get(baseURL)
    return blogs
}

export default {getAll}