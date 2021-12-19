import React from 'react'
import { useParams } from 'react-router-dom'

import { getATodo } from '../../lib/api'
import SaveForLater from './SaveForLater'
import TodoDelete from './TodoDelete'
import UpdateTodo from './UpdateTodo'

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
      <section className="todo-container">
        <div className="todo-item-container">
          <UpdateTodo todo={todo} />
          <TodoDelete todoId={todoId}/>
          <SaveForLater todo={todo}/>
        </div>
      </section>}
    </>
  )
}