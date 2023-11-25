import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface CustomAxiosInstance extends AxiosInstance { }

const axiosConfig: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
}

const instance: CustomAxiosInstance = axios.create(axiosConfig);

export default instance;