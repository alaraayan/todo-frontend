import React from 'react'


import { createATodo } from '../../lib/api'
import useForm from '../../hooks/useForm'
// import Button from '../common/Button'

export default function NewTodo({ todos, setTodos }) {
  const { formData, setFormData, formErrors, handleChange } = useForm({
    todoItem: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await createATodo(formData)
      setFormData({ todoItem: '' })
      setTodos([...todos, res.data])
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input  
          placeholder="What do you want to do next?"
          name="todoItem"
          className="todo-item"
          value={formData.todoItem} 
          onChange={handleChange}
        />
        {formErrors.todoItem && (
          <p>{formErrors.todoItem}</p>
        )}
      </div>
      <div>
        <button style={{ display: 'none' }} type="submit" className="user-form submit-button">
            Happy
        </button>
            
      </div>
      {/* <Button style={{ display: 'none' }} /> */}
    </form>
  )
}