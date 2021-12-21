import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import Button from '../common/Button'
import { loginUser } from '../../lib/api'
import { setToken, isAuthenticated } from '../../lib/auth'
import useForm  from '../../hooks/useForm'
import Logout from './Logout'

export default function Login() {
  
  const navigate = useNavigate()
  const isLoggedIn = isAuthenticated()
  const [isError, setIsError] = React.useState(false)
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const res = await loginUser(formData)
      setToken(res.data.token)
      
      navigate('/my-list')
      toast.success('Welcome back!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <>
      {isLoggedIn ? <Logout /> 
        :
    
        <section className="user-forms">
          <section className="form-container">
            <h1 className="user-form">Log In</h1>
            <form className="user-form" onSubmit={handleSubmit} >
          
              <div>
                {/* <label>Email</label> */}
                <input
                  className="user-form user-info"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                {/* <label>Password</label> */}
                <input
                  className="user-form user-info"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              {isError && (
                <p>
            Either email or password were incorrect
                </p>
              )}
        
              <Button text="Login" />
            
            </form>
            <footer>
              <h5 className="user-form">Don&apos;t have an account? <span><Link to="/register">Register now</Link></span></h5>
            </footer>
        
          </section>
          <ToastContainer />
        </section>
      }
    </>    
  )
} 

