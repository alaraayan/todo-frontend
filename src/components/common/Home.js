import { Link } from 'react-router-dom'

import Button from './Button'

export default function Home() {
  return (
    <section className="user-forms home-container">
      <div className="user-form" >
        <section className="form-container">
          <h2 className="user-form">Hi! What we have here is a simple to-do list, made to help you get sith done -we love puns...and Star Wars-.</h2> <br/>
          <h3>Nothing beats the satisfaction of finishing off everything on a to-do list, so don&apos;t let us keep you from it. <Link to="/login">Login</Link> to work on your list or <Link to="/register">register</Link> for an account if you are new and blast away! <span className="han-quote">Hokey religions and ancient weapons are no match for a good blaster at your side, kid!</span></h3>
          <div className="buttons-container">
            <Button text="Register" />
            <Button text="Login" />
          </div>
        </section>
        
      </div>
    </section>
  )
}