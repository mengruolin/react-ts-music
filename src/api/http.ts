import axios, { AxiosRequestConfig } from 'axios'
import { setLoading } from '@/store/actions/index'
import Store from '@/reducers/index'
import { Toast } from 'antd-mobile';

axios.defaults.baseURL = process.env.REACT_APP_PROXY_URL

axios.interceptors.request.use(config => {
  // Do something before request is sent
  return config;
  },error => {
  // Do something with request error
  Toast.fail(error)
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // Do something before response is sent
  Store.dispatch(setLoading('globalLading', false))
  return response.data;
  },error => {
  // Do something with response error
  Toast.fail(error)
  return Promise.reject(error);
});

const get = (url: string, params?: any) => {
  return axios.get(url, {params})
}

const post = (url: string, params?: any, config?: AxiosRequestConfig) => {
  return axios.post(url, params, config)
}

const getl = (url: string, params?: any) => {
  Store.dispatch(setLoading('globalLading', true))

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
