import axios from 'axios'

import { baseUrl } from '../config.js'

// * AUTH / USER REQUESTS

export function registerUser(formData) {
  console.log(formData)
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}