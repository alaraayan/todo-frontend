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

  return <span className="material-icons delete-icon tooltip" onClick={handleDelete}>
    <span className="tooltiptext tooltiptext-left">Delete forever</span>
    remove_circle_outline</span>
}