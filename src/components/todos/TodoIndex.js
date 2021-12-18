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
    <div>
      { todos && (
        todos.map((todo, index) => {
          return <p key={index}>{todo.todoItem}</p>
        })
      )}
    </div>
  )
}