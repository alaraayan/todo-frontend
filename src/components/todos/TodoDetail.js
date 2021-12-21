import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import { getATodo } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
import SaveForLater from './SaveForLater'
import TodoDelete from './TodoDelete'
import UpdateTodo from './UpdateTodo'
import Button from '../common/Button'

export default function TodoDetail() {
  const { todoId } = useParams()
  const [todo, setTodo] = React.useState([])
  const isLoggedIn = isAuthenticated()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isLoggedIn) navigate('/login')
    const getTodoData = async () => {
      try {
        const res = await getATodo(todoId)
        setTodo(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getTodoData()
  }, [todoId, navigate, isLoggedIn])

  return (
    <>
      {todo && 
      <section className="todo-container form-container">
        <div className="todo-item-container">
          <TodoDelete todoId={todoId}/>
          <SaveForLater todo={todo}/>
          <UpdateTodo todo={todo} />
        </div>
        <div className="buttons-container">
          <Link to="/my-list"><Button text="Your to-do list" /></Link>
          <Link to="/my-list/saved"><Button text="Your saved items" /></Link>
        </div>
      </section>}
    </>
  )
}