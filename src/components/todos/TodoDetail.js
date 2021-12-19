import { getTodoList, getATodo, updateATodo } from '../../lib/api'

export default function TodoDetail({
  todo, index, setTodos }) {

  const handleCheck = async (e) => {
    const todoId = e.target.dataset.todo
    const todoToMarkComplete = await getATodo(todoId)
    const formData = { ...todoToMarkComplete.data, isDone: true }
    await updateATodo(todoId, formData)
    const res = await getTodoList()
    setTodos(res.data.filter(todo => todo.isDone === false))
  }

  
  return (
    <div key={index} className="todo-item-container">
      <span className="material-icons todo-check" data-todo={todo.id} onClick={handleCheck}>check_circle_outline</span>
      <li  className="todo-item">{todo.todoItem}</li>
    </div>
  )
}