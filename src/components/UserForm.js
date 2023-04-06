import api from "../api/api";
import { useGlobalContext } from "../context/userContext.js";

function UserForm() {
  const { userFormData, setUserFormData } = useGlobalContext();

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

  const getUsers = async () => {
    try {
      const response = await api.get("/jam-user");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/jam-user", {
        name: userFormData.name,
        phoneNumber: userFormData.phoneNumber,
        email: userFormData.email,
      });
      console.log(userFormData);
    } catch (error) {
      console.error(error);
    }
    setUserFormData({
      name: "",
      phoneNumber: "",
      email: "",
    });
    getUsers();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <button className="btn" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default UserForm;
