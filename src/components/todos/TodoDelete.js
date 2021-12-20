import React from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteATodo } from '../../lib/api'

export default function TodoDelete({ todoId }) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      await deleteATodo(todoId)
      navigate('/my-list')
    } catch (err) {
      console.log(err)
    }
  }

  return <span className="material-icons delete-icon" onClick={handleDelete}>remove_circle_outline</span>
}