import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login/'

const logIn =async (body) => {
  const request = await axios.post(baseUrl,body)
  return request.data
}

export default { logIn }