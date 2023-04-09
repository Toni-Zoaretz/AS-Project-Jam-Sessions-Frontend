import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useUserGlobalContext } from "../context/userContext.js";

function Header() {
  const { currentUser, setCurrentUser } = useUserGlobalContext();
  const handleLogOut = () => {
    setCurrentUser("");
  };
  return (
    <>
      <header className="header">
        <nav>
          <ul className="list">
            <li>
              <Link to="/">Hey {currentUser.name}</Link>
            </li>
            <li>
              <Link to={`/page2/${currentUser.id}`}>Page2</Link>
            </li>
            <li>
              <Link to="/page3">Page3</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
