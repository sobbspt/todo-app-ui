import axios from 'axios'
export default axios.create({
    baseURL: 'https://c9d39c72.ngrok.io',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})
