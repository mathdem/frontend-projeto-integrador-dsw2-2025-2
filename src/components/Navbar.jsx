import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import ThemeButton from './ThemeButton'


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid bg-purple">
        <Link className='navbar-brand text-light' to="/artes">Principal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 bg-purple">
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/registrar">registrar</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/login">Login</NavLink>

            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-light" to="/profile">Perfil</NavLink>

            </li>
          </ul>
            <ThemeButton />
        </div>
      </div>
    </nav>
  )
}

export default Navbar