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
export function createATodo(formData) {
  return axios.post(`${baseUrl}/todos/`, formData, headers())
}

// * TODO ITEM REQUESTS

export function getATodo(todoId) {
  return axios.get(`${baseUrl}/todos/${todoId}/`, headers())
}
export function updateATodo(todoId, formData) {
  return axios.put(`${baseUrl}/todos/${todoId}/`, formData, headers())
}
export function deleteATodo(todoId) {
  return axios.delete(`${baseUrl}/todos/${todoId}/`, headers())
}