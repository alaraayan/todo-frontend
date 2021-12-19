import React from 'react'


import { getTodoList } from '../../lib/api'

export default function TodoIndex() {
  const [todos, setTodos] = React.useState([])

  React.useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await getTodoList()
        setTodos(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getTodoData()
  }, [])
  
  return (
    <section className="todo-container">
      <h1>I WILL LEMON THESE:</h1>
      <ul className="todo-list">
        { todos && (
          todos.map((todo, index) => {
            return <li key={index} className="todo-item">{todo.todoItem}</li>
          })
        )}
      </ul>
    </section>
  )
}