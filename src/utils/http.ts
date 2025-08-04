/*
 * @Author: By
 * @Date: 2022-08-18 14:52:43
 * @LastEditTime: 2023-04-18 17:26:52
 * @LastEditors: Abernethy-BY by15242952083@outlook.com
 * @Description: 封装axios请求
 * @FilePath: \big-screen\src\utils\http.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import type { HttpClientConfig, RequestParams } from 'axios-mapper'
import { Method } from 'axios-mapper'
import { ElMessage } from 'element-plus'

import type { HTTP_MODEL } from '~/model'

const config: HttpClientConfig = {
  baseURL: 'http://175.6.101.127:8700',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json;charset=UTF-8',
  },

  // headers: {},
}

const https = new HttpClient(config)
https.httpClient.interceptors.response.use((res) => {
  const userInfo = useUserStore()
  const { data } = res
  const succeedCodeList = [0, 5, 30, 31]
  if (Number(data.state) && Number(data.state) === 20) {
    ElMessage({ message: '已发送短信，如要重发短信，请稍等', type: 'error' })
    return Promise.reject(new Error('已发送短信，如要重发短信，请稍等'))
  }
  else if (Number(data.state) && Number(data.state) === 3) {
    ElMessage({ message: data.message, type: 'error' })
    userInfo.token = ''
    userInfo.userCode = ''
    userInfo.userRole = ''
    return Promise.reject(data.message)
  }
  else if (Number(data.state) && (!succeedCodeList.includes(Number(data.state)))) {
    ElMessage({ message: data.message, type: 'error' })
    return Promise.reject(data.message)
  }

  else { return res }
})

export const post = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.POST, data).then((response) => {
      resolve(response?.data)
    }, (err) => { reject(err) })
  })
}

export const get = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.GET, data).then((response) => {
      resolve(response?.data)
    }, (err) => { reject(err) })
  })
}
export const put = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.PUT, data).then((response) => {
      resolve(response?.data)
    }, (err: any) => { reject(err) })
  })
}
export const del = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.DELETE, data).then((response) => {
      resolve(response?.data)
    }, (err) => { reject(err) })
  })
}

export const gaoDeWebApi = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.GET, data).then((response) => {
      resolve(response)
    }, (err) => { reject(err) })
  })
}

export const loginPost = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.POST, data).then((response) => {
      resolve(response)
    }, (err) => { reject(err) })
  })
}

export const scanloginchkPost = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<HTTP_MODEL>(url, Method.POST, data).then((response) => {
      resolve(response)
    }, (err) => { reject(err) })
  })
}

export const stringPost = (url: string, data: RequestParams) => {
  return new Promise((resolve, reject) => {
    https.request<string>(url, Method.POST, data).then((response) => {
      resolve(response)
    }, (err) => { reject(err) })
  })
}
