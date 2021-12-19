import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { 
  faSpaceStationMoonAlt, 
  faJournalWhills, 
  faCatSpace, 
  faSwordLaser, 
  faJedi,
  faStarfighter 
} from '@fortawesome/pro-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'
// import logo from '../../assets/zenithLogo.png'

export default function Nav() {
  const navigate = useNavigate()
  // const location = useLocation()
  const isLoggedIn = isAuthenticated()
  const [sidebarShow, setSidebarShow] = useState(false)

  const handleSideBar = () => setSidebarShow(!sidebarShow)

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }


  return (
    <>
      <div className="navbar">
        {/* <Link to="/">
          <h1>
            GET SITH DONE
          </h1>
        </Link> */}
        <div className="menu-items-end" onClick={handleSideBar}>
          <Hamburger toggled={sidebarShow} toggle={setSidebarShow} />
        </div>
      </div>
      <div
        className={
          sidebarShow
            ? 'side-nav-menu-container active'
            : 'side-nav-menu-container'
        }
      >
        <div className="navbar-content-container" onClick={handleSideBar}>
          <NavLink to="/" icon={faSpaceStationMoonAlt} text="Home" />
          {isLoggedIn ? (
            <>
              <NavLink to="/my-list" text="To-Do List" icon={faJournalWhills} />
              <NavLink
                to="/my-list/saved"
                text="Saved Items"
                icon={faCatSpace}
              />
              <p className="navbar-item logout-link" onClick={handleLogout}>
                <FontAwesomeIcon
                  className="fa-items-icon"
                  icon={faSwordLaser}
                />
                Log out
              </p>
            </>
          ) : (
            <>
              <NavLink to="/register" icon={faJedi} text="Register" />
              <NavLink to="/login" icon={faStarfighter} text="Login" />
            </>
          )}
        </div>
      </div>
    </>
  )
}

function NavLink({ to, icon, text }) {
  return (
    <p>
      <Link to={to} className="navbar-item">
        <FontAwesomeIcon className="fa-items-icon" icon={icon} />
        {text}
      </Link>
    </p>
  )
}