import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import useForm from '../../hooks/useForm'
import { registerUser, loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'

function Register() {
  const quoteData = [
    'I am a freelancer, which is pretty much a modern day cowboy.',
    'Rejection from society is what created the X-Men.',
    'Realizations are the worst.',
    'Lovers... Oh, that word bums me out unless it is between meat and pizza.',
    'All of humankind has one thing in common: the sandwich. I believe that all anyone really wants in this life is to sit in peace and eat a sandwich.'
  ]

  const navigate = useNavigate()
  const [error, setError] = React.useState('')
  const [hasImage, setHasImage] = React.useState(false)
  const { formData, formErrors, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    profileImage: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await registerUser(formData)
      const loginForm = {
        email: formData.email,
        password: formData.password,
      }
      const res = await loginUser(loginForm)
      setToken(res.data.token)
      toast.error('Successfully registered! Welcome!')
      navigate('/my-list')
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  const handleImage = () => {
    setHasImage(true)
  }

  // console.log(hasImage)
  // console.log(formData)

  return (
    <section className="user-forms">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className={hasImage ? 'no-show' : ''}>
          <section className="form-container">
            <h1 className="user-form">Create a new account</h1>
          
            <div>
              {/* <label>Username</label> */}
              <input
                className="user-form user-info"
                placeholder="Username"
                onChange={handleChange}
                name="username"
                value={formData.username}
              />
              {formErrors.username && (
                <p>{formErrors.username}</p>
              )}
            </div>
            <div>
              {/* <label>Email</label> */}
              <input
                className="user-form user-info"
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
              />
              {formErrors.email && (
                <p>{formErrors.email}</p>
              )}
            </div>
            <div>
              {/* <label>Password</label> */}
              <input
                className="user-form user-info"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                name="password"
                value={formData.password}
              />
              {formErrors.password && (
                <p>{formErrors.password}</p>
              )}
            </div>
            <div>
              {/* <label>Password Confirmation</label> */}
              <input
                className="user-form user-info"
                type="password"
                placeholder="Password Confirmation"
                onChange={handleChange}
                name="passwordConfirmation"
                value={formData.passwordConfirmation}
              />
              {formErrors.passwordConfirmation && (
                <p className="user-form">{formErrors.passwordConfirmation}</p>
              )}
            </div>
            {error && <p>{error}</p>}
            <div>
              <button type="click" className="user-form submit-button" onClick={handleImage}>
            Register
              </button>
            
            </div>
          
            <footer>
              <h5>Already a member? <span><Link to="/login">Login instead.</Link></span> </h5>
            </footer>
        
          </section>
          <ToastContainer />
        </div>
        <div className={!hasImage ? 'no-show' : ''}>
          <section className="form-container">
            <h1 className="user-form">Choose a Liz Lemon quote:</h1>
            {quoteData.map((quote, index) => {
              return <button
                key={index}
                type="button"
                className="user-info quote-buttons" 
                name="profileImage" 
                value={index}
                onClick={handleChange}> 
                {quote}
              </button>
            })}
            <div>
              <button type="submit" className="user-form submit-button">
              Choose
              </button>
            
            </div>
          </section>
        </div>
      </form>
    </section>
  )
}

export default Register