import api from "../api/api";
import { useJamSessionGlobalContext } from "../context/jamContext";

function JamSessionMap() {
  const { location, setLocation, setAllJamSessions } =
    useJamSessionGlobalContext();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setLocation((prevDates) => {
      return {
        ...prevDates,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get(
        `/jam-sessions/radius/${location.zipCode}/${location.distance}`
      );
      console.log(response.data.data);
      setAllJamSessions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      JamSessionMap
      <form onSubmit={handleSubmit}>
        <span>Enter Your Zip Code</span>
        <input
          type="number"
          name="zipCode"
          value={location.zipCode}
          onChange={handleChange}
        ></input>
        <span>Enter km distance from your location</span>
        <input
          type="number"
          name="distance"
          value={location.distance}
          onChange={handleChange}
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default JamSessionMap;
