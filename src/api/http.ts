import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = '/api'

axios.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
  },error => {
  // Do something with request error
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // Do something before response is sent
  return response.data;
  },error => {
  // Do something with response error
  return Promise.reject(error);
});

const get = (url: string, params?: any) => {
  return axios.get(url, {params})
}

const post = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return axios.post(url, params, config)
}

const getl = (url: string, params?: any) => {
  return axios.get(url, {params})
}

const postl = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return axios.post(url, params, config)
}

export default {
  get,
  getl,
  post,
  postl
}
