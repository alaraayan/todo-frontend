import React from 'react'
import { useNavigate } from 'react-router-dom'

import { updateATodo } from '../../lib/api'

export default function SaveForLater({ todo }) {
  const navigate = useNavigate()

  const handleSaveForLater = async () => {
    try {
      const formData = { ...todo, isActive: false }
      await updateATodo(todo.id, formData)
      navigate('/my-list')
    } catch (err) {
      console.log(err)
    }
  }

  return <span className="material-icons later-icon tooltip" onClick={handleSaveForLater}>
    <span className="tooltiptext tooltiptext-left">Save for later</span>
    schedule</span>
}