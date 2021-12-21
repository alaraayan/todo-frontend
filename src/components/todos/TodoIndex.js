import React from 'react'
import { useNavigate } from 'react-router-dom'

import { getTodoList } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import TodoCard from './TodoCard'
import NewTodo from './NewTodo'


export default function TodoIndex() {
  const [todos, setTodos] = React.useState([])
  const isLoggedIn = isAuthenticated()
  const navigate = useNavigate()
  
  React.useEffect(() => {
    if (!isLoggedIn) navigate('/login')
    const getTodoData = async () => {
      try {
        const res = await getTodoList()
        const onlyTodos = res.data.filter(todo => {
          return (todo.isDone === false && todo.isActive === true)
        })
        setTodos(onlyTodos)
      } catch (err) {
        console.log(err)
      }
    }
    getTodoData()
  }, [setTodos, isLoggedIn, navigate])
  
  

  console.log(todos)
  return (
    <>
      {isLoggedIn && 
    <section className="todo-container">
      <h1>MAY THE FORCE BE WITH YOU...</h1>
      <NewTodo setTodos={setTodos} todos={todos}/>
      <ul className="todo-list">
        { todos && (
          todos.map((todo, index) => {
            return <TodoCard key={index} todo={todo} index={index} setTodos={setTodos} />
          })
        )}
      </ul>
    </section>
      }
    </>
  )
}