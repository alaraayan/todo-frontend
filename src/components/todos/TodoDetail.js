import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { getATodo, updateATodo } from '../../lib/api'
import TodoDelete from './TodoDelete'

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
  const handleBlur = async (e) => {
    try {
      const todoToMarkComplete = await getATodo(todoId)
      const formData = { ...todoToMarkComplete.data, todoItem: e.target.value }
      await updateATodo(todoId, formData)
      navigate('/my-list')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="todo-container">
      <div className="todo-item-container">
        <form>
          <input  
            placeholder="What do you want to do next?"
            name="todoItem"
            className="todo-item"
            defaultValue={todo.todoItem} 
            onBlur={handleBlur}
          />
        </form>
        <TodoDelete todoId={todoId}/>
        <span className="material-icons" onClick={handleSaveForLater}>schedule</span>
      </div>
    </section>
  )
}