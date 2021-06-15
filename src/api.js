import axios from 'axios';


const request = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:[YOUR_API_KEY],
    }
})

export default request;
