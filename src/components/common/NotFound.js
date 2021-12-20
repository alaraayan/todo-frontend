import React from 'react'
import { Link } from 'react-router-dom'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'

import { isAuthenticated } from '../../lib/auth'
import Button from './Button'

const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')

const gifsArray = [
  'C4C61QaHdVWc8',
  'xTiIzwKOMCBgMuDKpi',
  '3o84sqCUI5XeSkoXT2',
  '3owzWnNOhrklz1ou9G',
  'l1KsAVIlhsWoZC0Zq',
  'xTiIzzYsS5UeSANFbW',
  'nRkQduJDZ43bW',
  'xTiIzS3rg7z3IHa0so',
  '3o84sIQ7S5BLsvETIc',
  '3o84syFWP3L7coV26c',
  'l3fZOwcM57PzCk69q',
  'uq6ILNBI6g3As'
]
const randomizedGifs = gifsArray[Math.floor(Math.random() * gifsArray.length)]

export default function NotFound() {
  const isLoggedIn = isAuthenticated()
  const [gif, setGif] = React.useState(null)

  React.useEffect(() => {
    const getGif = async () => {
      const { data } = await giphyFetch.gif(randomizedGifs)
      setGif(data)
    }
    getGif()
  }, [])
  return (
    <>
      <section className="user-forms home-container">
        <div className="user-form" >
          <section className="form-container">
            <h2 className="centered-text">Uh oh, this is not the webpage you are looking for!</h2>
            <br />
            <div className="gif">{gif && <Gif gif={gif} width={400} />}</div>
            {isLoggedIn ? 
              <div className="buttons-container">
                <Link to="/my-list"><Button text="Your to-do list" /></Link>
                <Link to="/my-list/saved"><Button text="Your saved items" /></Link>
              </div>
              :
              <div className="buttons-container">
                <Link to="/"><Button text="Homepage" /></Link> 
              </div>
            }
            
          </section>
        </div>
      </section>
    </>
  )
}