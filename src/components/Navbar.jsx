import React from 'react'

import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link className='navbar-brand'to="/">Principal</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <NavLink className="nav-link" to="/sobre">Sobre</NavLink>
        </li>
        <li class="nav-item">
        <NavLink className="nav-link" to="/contato">Contato</NavLink>
          
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar