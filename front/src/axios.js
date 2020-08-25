import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:8080'
});

// Set default configs for requests
instance.interceptors.request.use(req => {
   req.headers.Authorization = localStorage.getItem(process.env.REACT_APP_TOKEN);
   return req;
});

export default instance;