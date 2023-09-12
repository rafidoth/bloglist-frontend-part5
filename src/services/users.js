import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users/'

const getAll =async () => {
  const request = await axios.get(baseUrl)
  console.log(request.data)
  return request.data
}

export default { getAll }