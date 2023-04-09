import api from "../api/api";
import { useUserGlobalContext } from "../context/userContext.js";

function UserFormRegister() {
  const { userFormData, setUserFormData, getCurrentUser } =
    useUserGlobalContext();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUserFormData((prevUserFormData) => {
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
        name: userFormData.name,
        phoneNumber: userFormData.phoneNumber,
        email: userFormData.email,
        password: userFormData.password,
      });
      getCurrentUser();
    } catch (error) {
      console.error(error);
    }
    setUserFormData({
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register(new user)</h2>
        <input
          type="text"
          name="name"
          value={userFormData.name}
          placeholder="Full Name"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="phoneNumber"
          value={userFormData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          value={userFormData.email}
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="password"
          value={userFormData.password}
          placeholder="enter password"
          onChange={handleChange}
        ></input>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default UserFormRegister;
