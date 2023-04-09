import api from "../api/api";
import { useUserGlobalContext } from "../context/userContext.js";

function UserFormLogin() {
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
      const response = await api.get(`/jam-user/email/${userFormData.email}`);
    } catch (error) {
      console.error(error);
    }
    getCurrentUser();
    setUserFormData({
      email: "",
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login with email(existing user)</h2>
        <input
          type="email"
          name="email"
          value={userFormData.email}
          placeholder="email address you register"
          onChange={handleChange}
        ></input>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default UserFormLogin;
