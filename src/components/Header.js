import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useUserGlobalContext } from "../context/userContext.js";
import { useJamSessionGlobalContext } from "../context/jamContext";

function Header() {
  const { currentUser, setCurrentUser } = useUserGlobalContext();
  const { jamSessionId } = useJamSessionGlobalContext();
  const handleLogOut = () => {
    setCurrentUser("");
  };

  // let page2Route = "";
  // if (jamSessionId && currentUser.id) {
  //   page2Route = `/page2/${currentUser.id}`;
  // } else if (jamSessionId) {
  //   page2Route = `/page2/${jamSessionId}`;
  // } else {
  //   page2Route = "/";
  // }

  // let page2Link;
  // if (!currentUser.id && jamSessionId) {
  //   page2Link = `/page2/${jamSessionId}`;
  // } else if (currentUser.id && !jamSessionId) {
  //   page2Link = `/page2/${currentUser.id}`;
  // } else {
  //   page2Link = "/page2/";
  // }

  return (
    <>
      <header className="header">
        <nav>
          <ul className="list">
            <li>
              <Link to="/">
                Hey {currentUser.name ? currentUser.name : "Guest"}
              </Link>
            </li>
            {/* <li>
              <Link to={page2Route}>Page2</Link>
            </li> */}
            <li>
              <Link to={`/page2/${currentUser.id}`}>Page2</Link>
            </li>
            <li>
              <Link to={`/page2/${jamSessionId}`}>Page2 updates</Link>
            </li>
            <li>
              <Link to="/searchPage">Search For A Jam</Link>
            </li>
            <li>
              <Link to={`/my-jam/${currentUser.id}`}>My Jam`s</Link>
            </li>
            <li>
              <button onClick={handleLogOut} className="btn">
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
