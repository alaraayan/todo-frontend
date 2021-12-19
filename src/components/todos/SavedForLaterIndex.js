import React from 'react'


import { getTodoList } from '../../lib/api'
import TodoCard from './TodoCard'


export default function SavedForLaterIndex() {
  const [todos, setTodos] = React.useState([])
  
  React.useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await getTodoList()
        const onlyTodos = res.data.filter(todo => {
          return (todo.isDone === false && todo.isActive === false)
        })
        setTodos(onlyTodos)
      } catch (err) {
        console.log(err)
      }
    }
    getTodoData()
  }, [setTodos])
  
  

  console.log(todos)
  return (
    <section className="todo-container">
      <h1>I WILL LEMON THESE:</h1>
      <ul className="todo-list">
        { todos && (
          todos.map((todo, index) => {
            return <TodoCard key={index} todo={todo} index={index} setTodos={setTodos} />
          })
        )}
      </ul>
    </section>
  )
}