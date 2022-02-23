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
    console.log(blogdata, token)
    const config = {
        headers: {Authorization: token}
    }
    const result = await axios.post(baseURL, blogdata, config)
    return result
}

export default {getAll, create, setToken}