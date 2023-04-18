import api from "../api/api";
import { useUserGlobalContext } from "../context/userContext";
import { useJamSessionGlobalContext } from "../context/jamContext";
import UserContactCard from "../components/UserContactCard";
import { FaInfoCircle } from "react-icons/fa";

function JamSessionMap() {
  const {
    location,
    setLocation,
    setAllJamSessions,
    filterButton,
    setFilterButton,
    getAllJamSessions,
  } = useJamSessionGlobalContext();

  const { userContactCard } = useUserGlobalContext();

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

  const filterByLocation = async (event) => {
    event.preventDefault();
    if (filterButton) {
      getAllJamSessions();
      setLocation({
        zipCode: "",
        distance: "",
      });
      setFilterButton(false);
      return;
    }
    try {
      const response = await api.get(
        `/jam-sessions/radius/${location.zipCode}/${location.distance}`
      );
      setFilterButton(true);
      setAllJamSessions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="search-page-container" id="location-section">
      <div className="form-container">
        <form onSubmit={filterByLocation} className="filter-form">
          <span className="filter-title">Filter By Location</span>
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
          <button type="submit" className="btn filter-btn">
            {filterButton ? "Remove Filter" : "Filter"}
          </button>
          <p className="info-text">
            <FaInfoCircle />
            On The Map Below Click On Jam Session<br></br>Name in Order To See
            Jam User Contact Details
          </p>
        </form>
      </div>
      {userContactCard ? (
        <div>
          <UserContactCard />
        </div>
      ) : null}
    </div>
  );
}

export default JamSessionMap;
