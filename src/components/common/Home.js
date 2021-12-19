import React from 'react'
import { Link } from 'react-router-dom'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'

import Button from './Button'

const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

export default function Home() {
  const [gif, setGif] = React.useState(null)
  React.useEffect(() => {
    const getGif = async () => {
      const { data } = await giphyFetch.gif('ehnBGPgDOusUM')
      setGif(data)
    }
    getGif()
  }, [])

  return (
    <section className="user-forms home-container">
      <div className="user-form" >
        <section className="form-container">
          <h2 className="user-form">Hi! What we have here is a simple to-do list, made to help you get sith done -we love puns...and Star Wars-.</h2> <br/>
          <h3>Nothing beats the satisfaction of finishing off everything on a to-do list, so don&apos;t let us keep you from it. <Link to="/login">Login</Link> to work on your list or <Link to="/register">register</Link> for an account if you are new and blast away! <span className="han-quote">Hokey religions and ancient weapons are no match for a good blaster at your side, kid!</span></h3>
          <div className="gif">{gif && <Gif gif={gif} width={400} />}</div>
          <div className="buttons-container">
            <Link to="/register"><Button text="Register" /></Link>
            <Link to="/login"><Button text="Login" /></Link>
          </div>
          
        </section>
        
      </div>
    </section>
  )
}