import React from 'react'
import { Link } from 'react-router-dom'

import { getTodoList, updateATodo, getATodo } from '../../lib/api'
import Button from '../common/Button'


export default function SavedForLaterIndex() {
  const [savedLaterTodos, setSavedLaterTodos] = React.useState([])
  
  React.useEffect(() => {
    const getTodoData = async () => {
      try {
        const res = await getTodoList()
        const onlySavedTodos = res.data.filter(todo => {
          return (todo.isDone === false && todo.isActive === false)
        })
        setSavedLaterTodos(onlySavedTodos)
      } catch (err) {
        console.log(err)
      }
    }
    getTodoData()
  }, [setSavedLaterTodos])
  
  const handleAddToList = async (e) => {
    try {
      const todoId = e.target.dataset.todo
      const todoToAddBackToList = await getATodo(todoId)
      const formData = { ...todoToAddBackToList.data, isActive: true }
      await updateATodo(todoId, formData)
      const res = await getTodoList()
      setSavedLaterTodos(res.data.filter(todo => (todo.isDone === false && todo.isActive === false)))
    } catch (err) {
      console.log(err)
    }
  }
  

  console.log(savedLaterTodos)
  return (
    <section className="todo-container form-container">
      <h1>READY TO TACKLE THESE? EASILY ADD ITEMS TO YOUR CURRENT LIST.</h1>
      <ul className="todo-list">
        { savedLaterTodos ? 
          (
            savedLaterTodos.map((todo, index) => {
              return (
                <div key={index} className="todo-item-container">
                  <span 
                    className="material-icons add-back-icon tooltip" 
                    data-todo={todo.id} 
                    onClick={handleAddToList}
                  ><span className="tooltiptext tooltiptext-left">Reactivate</span>
                  add_task
                  </span>
                  <li  className="saved-item">
                    {todo.todoItem}
                  </li>
                </div>
              )
            })
          )
          :
          (
            <div className="todo-item-container">
              <h3>Looks like you have nothing saved for later...</h3>
            </div>
          )
        }
      </ul>
      <Link to="/my-list" className="goback-container"><Button text="Go back to your list" /></Link>
    </section>
  )
}