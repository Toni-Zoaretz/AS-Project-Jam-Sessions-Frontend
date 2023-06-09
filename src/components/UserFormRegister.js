import { useEffect } from "react";
import api from "../api/api";
import { useUserGlobalContext } from "../context/userContext.js";
import { registerValidation } from "../Utils/registerValidation";

import { useNavigate } from "react-router-dom";

function UserFormRegister({ setShowForm }) {
  const navigate = useNavigate();

  const {
    userRegisterFormData,
    setUserRegisterFormData,
    errorMessage,
    setErrorMessage,
    currentUser,
    setAllUsers,
    setCurrentUser,
  } = useUserGlobalContext();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegisterFormData((prevUserFormData) => {
      return {
        ...prevUserFormData,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    if (currentUser) {
      navigate(`/jamFormPage/${currentUser.id}`);
    }
  }, [currentUser]);

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/jam-user");
      setAllUsers(response.data);
      setCurrentUser(response.data[response.data.length - 1]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    registerValidation(
      userRegisterFormData.password,
      userRegisterFormData.phoneNumber,
      userRegisterFormData.email,
      setErrorMessage
    );
    try {
      await api.post("/jam-user", {
        name: userRegisterFormData.name,
        phoneNumber: userRegisterFormData.phoneNumber,
        email: userRegisterFormData.email,
        password: userRegisterFormData.password,
      });
    } catch (error) {
      console.error(error);
    }
    await getCurrentUser();
    setUserRegisterFormData({
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          value={userRegisterFormData.name}
          placeholder="Full Name"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="phoneNumber"
          value={userRegisterFormData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          value={userRegisterFormData.email}
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={userRegisterFormData.password}
          placeholder="enter password"
          onChange={handleChange}
        ></input>
        <button className="btn" type="submit">
          Register
        </button>
        Already have an account?
        <a
          href="#loginForm"
          onClick={() => setShowForm(true)}
          id="registerForm"
        >
          Click here
        </a>
        {errorMessage ? <p> {errorMessage} </p> : null}
      </form>
    </div>
  );
}

export default UserFormRegister;
