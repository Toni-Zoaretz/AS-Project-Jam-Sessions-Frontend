import api from "../api/api";
import { useUserGlobalContext } from "../context/userContext.js";
import { loginValidation } from "../Utils/loginValidation";

function UserFormLogin({ setShowForm }) {
  const {
    userLoginFormData,
    setUserLoginFormData,
    setCurrentUser,
    errorMessage,
    setErrorMessage,
    allUsers,
  } = useUserGlobalContext();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserLoginFormData((prevUserFormData) => {
      return {
        ...prevUserFormData,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    loginValidation(
      allUsers,
      userLoginFormData.email,
      userLoginFormData.password,
      setErrorMessage
    );

    try {
      const response = await api.get(
        `/jam-user/email/${userLoginFormData.email}`
      );
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }
    setUserLoginFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={userLoginFormData.email}
          placeholder="Enter Your Email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={userLoginFormData.password}
          placeholder="Enter Your Password"
          onChange={handleChange}
        ></input>
        <button className="btn" type="submit">
          Login
        </button>
        <a
          href="#registerForm"
          onClick={() => setShowForm(false)}
          id="loginForm"
        >
          Click here to Register
        </a>
        {errorMessage ? <p> {errorMessage} </p> : null}
      </form>
    </div>
  );
}

export default UserFormLogin;
