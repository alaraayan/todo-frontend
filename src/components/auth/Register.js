import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

import Button from '../common/Button'
import useForm from '../../hooks/useForm'
import { registerUser, loginUser } from '../../lib/api'
import { setToken, isAuthenticated } from '../../lib/auth'
import Logout from './Logout'

export default function Register() {
  
  const isLoggedIn = isAuthenticated()
  const navigate = useNavigate()
  const [error, setError] = React.useState('')
  const { formData, formErrors, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
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

  return (
    <>
      {isLoggedIn ? <Logout /> 
        :
    
        <section className="user-forms">
          <form className="user-form" onSubmit={handleSubmit}>
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
              <Button text="Register" />
          
              <footer>
                <h5>Already a member? <span><Link to="/login">Login instead.</Link></span> </h5>
              </footer>
        
            </section>
            <ToastContainer />
          </form>
        </section>
      }
    </>
  )
}

