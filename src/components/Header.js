import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineForm } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import { useUserGlobalContext } from "../context/userContext.js";
import { useJamSessionGlobalContext } from "../context/jamContext";

function Header() {
  const { currentUser, setCurrentUser, setErrorMessage } =
    useUserGlobalContext();
  const { jamSessionId } = useJamSessionGlobalContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    setErrorMessage(" ");
    setCurrentUser("");
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <nav>
          <ul className="list">
            <div>
              <li>
                <Link to="/">
                  Hey {currentUser.name ? currentUser.name : "Guest"}
                </Link>
              </li>
            </div>
            <div className="middle-nav">
              <div>
                <li>
                  <Link to={`/jamFormPage/${currentUser.id}`}>
                    Jam Form <AiOutlineForm />
                  </Link>
                </li>
              </div>

              <div>
                <li>
                  <Link to={`/jamFormPage/${jamSessionId}`}></Link>
                </li>
              </div>
              <div>
                <li>
                  <Link to="/searchPage">
                    Search Jam <AiOutlineSearch className="icon" />
                  </Link>
                </li>
              </div>
              <li>
                <Link to={`/my-jam/${currentUser.id}`}>
                  My Jam`s <AiOutlineUser />
                </Link>
              </li>
            </div>
            <div>
              <li>
                <button onClick={handleLogOut} className="btn">
                  Log Out
                </button>
              </li>
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
