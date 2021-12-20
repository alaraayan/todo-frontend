import { useNavigate } from 'react-router-dom'

import { removeToken } from '../../lib/auth'
import Button from '../common/Button'

export default function Logout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  return (
    <section className="user-forms">
      <div className="user-form" >
        <section className="form-container">
          <h1 className="user-form">Looks like you are already logged in. Click below to logout or use the menu to go to a different page.</h1>
          <div onClick={handleLogout}><Button text="Logout" /></div>
        </section>
      </div>
    </section>
  )




}