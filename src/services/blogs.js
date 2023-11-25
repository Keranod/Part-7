import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update =  async (id, newObject) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)

    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${ baseUrl }/${id}`, config)

    return response.data
}

const like = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const blogUrl = `${baseUrl}/${id}`
    const responseGet = await axios.get(blogUrl)
    const likedBlog = responseGet.data
    const response = await axios.put(blogUrl, { ...likedBlog, likes: likedBlog.likes + 1 }, config)

    return response.data
}

const addComment = async (id, comment) => {
    const config = {
        headers: { Authorization: token },
    }

    const blogCommentsUrl = `${baseUrl}/${id}/comments`
    const response = await axios.post(blogCommentsUrl, { comment }, config)
    // console.log(response.data)
    return response.data
}

export default { getAll, create, update, remove, setToken, like, addComment }