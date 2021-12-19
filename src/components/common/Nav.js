import React, { useState } from 'react'
import Hamburger from 'hamburger-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUsers,
  faUserPlus,
  faSignOutAlt,
  // faRocket
  faUmbrellaBeach,
  faClipboardList

} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'
// import logo from '../../assets/zenithLogo.png'

export default function Nav() {
  const navigate = useNavigate()
  // const location = useLocation()
  const isLoggedIn = isAuthenticated()
  const [showColor, setShowColor] = React.useState(false)
  const [sidebarShow, setSidebarShow] = useState(false)

  const handleSideBar = () => setSidebarShow(!sidebarShow)

  const handleLogout = () => {
    removeToken()
    navigate('/')
  }

  React.useEffect(() => {
    const scrollListener = () => {
      window.scrollY > 150 ? setShowColor(true) : setShowColor(false)
    }
    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <div
        className={`navbar ${
          showColor ? 'navbar-show-color' : 'navbar-default-color'
        }`}
      >
        <Link to="/">
          <h1>
            SITH HAPPENS
          </h1>
        </Link>
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
          <NavLink to="/" icon={faHome} text="Home" />
          {isLoggedIn ? (
            <>
              <NavLink to="/my-list" text="To-Do List" icon={faClipboardList} />
              <NavLink
                to="/my-list/saved"
                text="Saved Items"
                icon={faUmbrellaBeach}
              />
              <p className="navbar-item logout-link" onClick={handleLogout}>
                <FontAwesomeIcon
                  className="fa-items-icon"
                  icon={faSignOutAlt}
                />
                Log out
              </p>
            </>
          ) : (
            <>
              <NavLink to="/register" icon={faUserPlus} text="Register" />
              <NavLink to="/login" icon={faUsers} text="Login" />
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