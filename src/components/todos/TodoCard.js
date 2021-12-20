import { Link } from 'react-router-dom'
import { getTodoList, getATodo, updateATodo } from '../../lib/api'

export default function TodoCard({
  todo, setTodos }) {

  const handleCheck = async (e) => {
    try {
      const todoId = e.target.dataset.todo
      const todoToMarkComplete = await getATodo(todoId)
      const formData = { ...todoToMarkComplete.data, isDone: true }
      await updateATodo(todoId, formData)
      const res = await getTodoList()
      setTodos(res.data.filter(todo => (todo.isDone === false && todo.isActive === true)))
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <div className="todo-item-container">
      <span 
        className="material-icons todo-check tooltip" 
        data-todo={todo.id} 
        onClick={handleCheck}
      ><span className="tooltiptext tooltiptext-left">Mark as done</span>
        check_circle_outline
      </span>
      <Link to={`/my-list/todos/${todo.id}`} className="tooltip">
        <span className="tooltiptext tooltiptext-right">Click to edit</span>
        <li  className="todo-item tooltip">
          {todo.todoItem}
        </li>
      </Link>
    </div>
  )
}