import React from 'react'
import { useNavigate } from 'react-router-dom'

import { updateATodo } from '../../lib/api'

export default function UpdateTodo({ todo }) {
  const navigate = useNavigate()

  const handleBlur = async (e) => {
    try {
      const formData = { ...todo, todoItem: e.target.value }
      await updateATodo(todo.id, formData)
    } catch (err) {
      console.log(err)
    }
  }
  
  const handleSubmit = () => {
    try {
      navigate('/my-list')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input  
        placeholder="What do you want to do next?"
        name="todoItem"
        className="todo-item"
        defaultValue={todo.todoItem} 
        onChange={handleBlur}
      />
      <div>
        <button style={{ display: 'none' }} type="submit" className="user-form submit-button">
            Happy
        </button>
            
      </div>
    </form>
  )
}