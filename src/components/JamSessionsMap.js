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
    <div className="search-page-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="filter-form">
          <span className="filter-title">Filter By Location</span>
          {/* <div className="filter-container"> */}
          <div className="filter-field">
            <span>Enter Your Zip Code:</span>
            <input
              type="number"
              name="zipCode"
              value={location.zipCode}
              onChange={handleChange}
            ></input>
          </div>
          <div className="filter-field distance">
            <span className="input-distance-span">
              Enter Distance From Your Location:
            </span>
            <input
              className="input-distance"
              type="number"
              name="distance"
              value={location.distance}
              onChange={handleChange}
            ></input>
          </div>
          {/* </div> */}
          <button type="submit" className="btn filter-btn">
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default JamSessionMap;
