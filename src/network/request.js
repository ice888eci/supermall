import axios from 'axios';
function request(option) {
    let instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 10000,
    });

    /**
     * 请求拦截器
     * @interceptors
     */
    axios.interceptors.request.use(config => {
        return config;
    }, error => {
        return Promise.reject(error);
    });

    /**
     * 响应拦截器
     * @interceptors
     * 拦截成功要return
     */
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        return Promise.reject(error);
    });

    return instance(option);
}
export { request }