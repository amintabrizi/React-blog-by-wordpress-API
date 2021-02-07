import axios from 'axios';

const blogAPI = axios.create({
    baseURL: 'http://hamyaredigi.ir/amin/index.php/wp-json',
    //timeout: 5000,
})

blogAPI.interceptors.request.use(function(config) {
    //console.log('test request');
    //ghab az return mitoonid functioni ro ejra konid
    return config;
} , function(err) {
    // handle error
    //console.log('test request error');
    return Promise.reject(err)
})

blogAPI.interceptors.response.use(function(response) {
    //ghab az return mitoonid functioni ro ejra konid
    //console.log('test response');
    return response;
},function(err) {
    // System log
    //console.log('test response error');

    return Promise.reject(err);
})


export default blogAPI;