import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs/'

let token;
const setToken = newToken => token = `bearer ${newToken}`

const create =async (body) => {
    const config = {
        headers: { Authorization: token },
    }  
    const request = await axios.post(baseUrl,body)
    return request.data
}


const getAll = async () =>{
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.get(baseUrl,config);
    return response.data
}

export default { setToken,create,getAll }