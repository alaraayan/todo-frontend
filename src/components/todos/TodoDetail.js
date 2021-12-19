import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { deleteATodo, getATodo } from '../../lib/api'


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
  
  return (
    <section className="todo-container">
      <div className="todo-item-container">
        <li  className="todo-item">{todo.todoItem}</li>
        <span className="material-icons" onClick={handleDelete}>remove_circle_outline</span>
      </div>
    </section>
  )
}