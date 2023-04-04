import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="header">
        <nav>
          <ul className="list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page2">Page2</Link>
            </li>
            <li>
              <Link to="/page3">Page3</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
