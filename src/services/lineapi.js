import axios from 'axios'
export default axios.create({
    baseURL: 'https://api.line.me/v2',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})
