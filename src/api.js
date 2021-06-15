import axios from 'axios';


const request = axios.create({
    baseURL:'https://youtube.googleapis.com/youtube/v3/',
    params:{
        key:"AIzaSyBaRiUPmK3EADeinW1CxMVMXHQaXj2P_Qw",
    }
})

export default request;