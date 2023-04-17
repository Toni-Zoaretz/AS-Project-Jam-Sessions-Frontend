import api from "../api/api";
import { useUserGlobalContext } from "../context/userContext.js";

function UserFormRegister({ setShowForm }) {
  const { userRegisterFormData, setUserRegisterFormData, getCurrentUser } =
    useUserGlobalContext();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/jam-user", {
        name: userRegisterFormData.name,
        phoneNumber: userRegisterFormData.phoneNumber,
        email: userRegisterFormData.email,
        password: userRegisterFormData.password,
      });
    } catch (error) {
      console.error(error);
    }
    getCurrentUser();
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
          type="text"
          name="password"
          value={userRegisterFormData.password}
          placeholder="enter password"
          onChange={handleChange}
        ></input>
        <button className="btn" type="submit">
          Register
        </button>
        Already have an account?
        <a href="#" onClick={() => setShowForm(true)}>
          Click here
        </a>
      </form>
    </div>
  );
}

export default UserFormRegister;