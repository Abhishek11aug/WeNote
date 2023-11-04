import React, { useContext } from 'react';
import "../CSS/Navbar.css";
import LoginContext from "../Context/Notes/LoginContext";
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const context = useContext(LoginContext);
  const { isLogged } = context;
  const location = useLocation().pathname;  
  const handelLogOut = ()=>{
    localStorage.removeItem('Token');
    window.location.replace("/home");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">WeNotes</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location === "/home" || "/" ? "active" : ""}`} to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === "/notes" ? "active" : ""}`} aria-current="page" to="/notes">Notes</Link>
              </li>
            </ul>
            <button className={`btn btn-success m-2 d-${isLogged ? "none" : "block"}`}>
              <Link className={`nav-link`} to="/login">Login</Link>
            </button>
            <button className={`btn btn-success m-2 d-${isLogged ? "none" : "block"}`}>
              <Link className={`nav-link`} to="/signup">SignUp</Link>
            </button>
            <button className={`btn btn-success m-2 d-${isLogged ? "block" : "none"}`} onClick={handelLogOut}>
              LogOut
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
