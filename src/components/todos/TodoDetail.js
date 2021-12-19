import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { deleteATodo, getATodo, updateATodo } from '../../lib/api'


export default function TodoDetail() {
  const { todoId } = useParams()
  const navigate = useNavigate()
  const [todo, setTodo] = React.useState([])

  React.useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await getATodo(todoId)
        setTodo(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getTodoData()
  }, [todoId])
  
  const handleDelete = async () => {
    try {
      await deleteATodo(todoId)
      navigate('/my-list')
    } catch (err) {
      console.log(err)
    }
  }
  const handleSaveForLater = async () => {
    try {
      const todoToMarkComplete = await getATodo(todoId)
      const formData = { ...todoToMarkComplete.data, isActive: false }
      await updateATodo(todoId, formData)
      navigate('/my-list')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="todo-container">
      <div className="todo-item-container">
        <li  className="todo-item">{todo.todoItem}</li>
        <span className="material-icons" onClick={handleDelete}>remove_circle_outline</span>
        <span className="material-icons" onClick={handleSaveForLater}>schedule</span>
      </div>
    </section>
  )
}