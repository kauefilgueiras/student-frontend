import axios from 'axios'
 
const api = axios.create({
    baseURL: 'https://project-student-backend.herokuapp.com/'
})
 
export default api;