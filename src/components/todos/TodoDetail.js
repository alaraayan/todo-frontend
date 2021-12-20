import React from 'react'
import { useParams, Link } from 'react-router-dom'

import { getATodo } from '../../lib/api'
import SaveForLater from './SaveForLater'
import TodoDelete from './TodoDelete'
import UpdateTodo from './UpdateTodo'
import Button from '../common/Button'

export default function TodoDetail() {
  const { todoId } = useParams()
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