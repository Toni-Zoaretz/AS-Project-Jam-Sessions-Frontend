import api from "../api/api";
import { useParams } from "react-router-dom";
import { useJamSessionGlobalContext } from "../context/jamContext";

function JamSessionForm() {
  const { jamSessionFormData, setJamSessionFormData } =
    useJamSessionGlobalContext();

  const { userId } = useParams();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = `${jamSessionFormData.streetNumber} ${jamSessionFormData.streetName} St, ${jamSessionFormData.cityName}, ${jamSessionFormData.zipcode}, ${jamSessionFormData.countryName}`;
    try {
      await api.post(`/jam-sessions/${userId}`, {
        jamSessionName: jamSessionFormData.jamSessionName,
        instruments: jamSessionFormData.instruments,
        address,
        date: jamSessionFormData.date,
      });
    } catch (error) {
      console.error(error);
    }
    setJamSessionFormData({
      jamSessionName: "",
      instruments: "",
      streetName: "",
      streetNumber: "",
      cityName: "",
      countryName: "",
      zipcode: "",
      date: "",
    });
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
          name="streetName"
          value={jamSessionFormData.streetName}
          placeholder="St name"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="streetNumber"
          value={jamSessionFormData.streetNumber}
          placeholder="St Number"
          onChange={handleChange}
        ></input>
        <input
          type="number"
          name="zipcode"
          value={jamSessionFormData.zipcode}
          placeholder="Zip Code"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="cityName"
          value={jamSessionFormData.cityName}
          placeholder="City Name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="countryName"
          value={jamSessionFormData.countryName}
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

export default JamSessionForm;
