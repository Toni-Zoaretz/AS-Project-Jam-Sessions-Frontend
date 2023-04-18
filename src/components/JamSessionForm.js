import api from "../api/api";
import { useParams } from "react-router-dom";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { useUserGlobalContext } from "../context/userContext";

function JamSessionForm() {
  const {
    jamSessionFormData,
    setJamSessionFormData,
    jamSessionId,
    setJamSessionId,
    updateFormData,
    setUpdateFormData,
  } = useJamSessionGlobalContext();

  // ----------------------------------------------------------------
  const { setCurrentUser, currentUser } = useUserGlobalContext();
  // ----------------------------------------------------------------

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
      if (jamSessionId) {
        await api.put(`jam-sessions/${jamSessionId}`, {
          jamSessionName: jamSessionFormData.jamSessionName,
          instruments: jamSessionFormData.instruments,
          address,
          date: jamSessionFormData.date,
        });
        setJamSessionId(null);
      } else {
        await api.post(`/jam-sessions/${userId}`, {
          jamSessionName: jamSessionFormData.jamSessionName,
          instruments: jamSessionFormData.instruments,
          address,
          date: jamSessionFormData.date,
        });
      }
      // -------------------------
      const response = await api.get(`/jam-user/${userId}`);
      console.log(response.data);
      console.log(
        "😊 The Respond above in the Current User from Jam Form Page"
      );
      setCurrentUser(response.data);
      // -------------------------
    } catch (error) {
      console.error(error);
    }

    setUpdateFormData(false);
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
        <h3>
          {updateFormData
            ? "Update Your Jam Session!"
            : "Create Your Own Jam Session!"}
        </h3>
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
          {updateFormData ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default JamSessionForm;
