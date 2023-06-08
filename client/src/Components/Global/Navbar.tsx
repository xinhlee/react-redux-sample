import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand">Navbar</a>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page">
              Page 1
            </a>
            <a className="nav-link">Page 2</a>
            <a className="nav-link">Page 3</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
