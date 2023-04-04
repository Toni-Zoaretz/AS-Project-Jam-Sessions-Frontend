import api from "../api/api";
import { useGlobalContext } from "../context/globalContext";

function UserForm() {
  const { formData, setFormData, setUser, user } = useGlobalContext();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  const getUsers = async () => {
    try {
      // setLoading(true);
      const response = await api.get("/jam-user");
      console.log(response.data);
      // setUser(response.data);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/jam-user", {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      });
      console.log(formData);
      setUser(response.data);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
    setFormData({
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
          value={formData.name}
          placeholder="Full Name"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Phone Number"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          name="email"
          value={formData.email}
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
