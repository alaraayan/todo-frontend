import React from 'react'

export default function useForm(initialValue) {
  const [formData, setFormData] = React.useState(initialValue)
  const [formErrors, setFormErrors] = React.useState(initialValue)


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }

  const clearForm = () => (setFormData(initialValue), setFormErrors(initialValue))

  return { 
    formData, 
    handleChange,
    setFormErrors,
    setFormData,
    formErrors,
    clearForm,
  } 
}