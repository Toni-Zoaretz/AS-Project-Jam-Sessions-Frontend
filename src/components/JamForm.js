import api from "../api/api";
import { useGlobalContext } from "../context/jamContext";

function JamForm() {
  const { jamSessionFormData, setJamSessionFormData } = useGlobalContext();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setJamSessionFormData((prevJamSessionFormData) => {
      return {
        ...prevJamSessionFormData,
        [name]: value,
      };
    });
  }

  const getJamSessions = async () => {
    try {
      const response = await api.get("/jam-sessions");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post("/jam-sessions", {
        jamSessionName: jamSessionFormData.jamSessionName,
        instruments: jamSessionFormData.instruments,
        address: jamSessionFormData.address,
        date: jamSessionFormData.date,
      });
      console.log(jamSessionFormData);
    } catch (error) {
      console.error(error);
    }
    // setFormData({
    //   name: "",
    //   phoneNumber: "",
    //   email: "",
    // });
    getJamSessions();
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create Your Own Jam Session!</h2>
        <input
          type="text"
          name="jamSessionName"
          value={jamSessionFormData.jamSessionName}
          placeholder="Jam Session Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="instruments"
          value={jamSessionFormData.instruments}
          placeholder="instruments"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="address"
          value={jamSessionFormData.address}
          placeholder="St name"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="address"
          value={jamSessionFormData.address}
          placeholder="St Number"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="address"
          value={jamSessionFormData.address}
          placeholder="Zip Code"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="address"
          value={jamSessionFormData.address}
          placeholder="City Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="address"
          value={jamSessionFormData.address}
          placeholder="Country Name"
          onChange={handleChange}
        ></input>
        <input
          type="date"
          name="date"
          value={jamSessionFormData.date}
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default JamForm;
