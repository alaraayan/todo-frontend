import axios from 'axios'

import { baseUrl } from '../config.js'
import { getToken } from './auth'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// * AUTH / USER REQUESTS

export function registerUser(formData) {
  console.log(formData)
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}

// * TODO LIST REQUESTS

export function getTodoList() {
  return axios.get(`${baseUrl}/todos/`, headers())
}