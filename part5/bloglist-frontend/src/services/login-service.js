import axios from 'axios'

const baseURL = 'http://localhost:3003/api/login'

const login = async (user, pass) => {
  const result = await axios.post(baseURL, { username: user, password: pass })
  return result
}

export default { login }