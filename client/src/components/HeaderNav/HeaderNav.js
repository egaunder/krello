import React from 'react'
import NavButton from '../NavButton/NavButton'
import LoginButton from '../LoginButton/LoginButton'
import './HeaderNav.css'

const HeaderNav = () => {
  const loginText = 'Log in'
  return (
    <nav className="header-nav-wrapper">
      <NavButton render={
        () => (<LoginButton text={loginText} />)
      }
      />
    </nav>
  )
}

export default HeaderNav
