import axios from 'axios'
export default axios.create({
    baseURL: 'https://9f9942b0.ngrok.io',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})
