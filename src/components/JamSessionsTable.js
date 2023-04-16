import React from "react";
import api from "../api/api.js";
import { FaInfoCircle } from "react-icons/fa";
import CustomizedTables from "../components/CustomizedTables.js";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { useUserGlobalContext } from "../context/userContext";
import { formatTimestamp } from "../Utils/formatTimestamp.js";
import UserContactCard from "../components/UserContactCard";

function JamSessionsTable() {
  const columns = ["Jam Session Name", "Creator", "Date", "Address"];
  const { dates, setDates, allJamSessions, setAllJamSessions } =
    useJamSessionGlobalContext();
  const { getUserContactInfoByName, userContactCard, setUserContactCard } =
    useUserGlobalContext();

  const rows = allJamSessions.map((row, i) => ({
    name: row.jamSessionName,
    creator: row.user_id ? row.user_id.name : "unavailable",
    date: formatTimestamp(row.date),
    address: row.location.formattedAddress,
    _id: row._id,
  }));

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setDates((prevDates) => {
      return {
        ...prevDates,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    console.log("form submitted");
    event.preventDefault();
    console.log(dates.from, dates.to);
    try {
      const response = await api.get(`/jam-sessions/${dates.from}/${dates.to}`);
      console.log(response.data.data);
      setAllJamSessions(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="search-jam-title">
        <h3>Here You Can Filter by Date or Location</h3>
      </div>
      <div className="search-page-container">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="filter-form">
            <span className="filter-title">Filter By Dates</span>
            <div className="filter-container">
              <div className="filter-field">
                <span>Start Date:</span>
                <input
                  type="date"
                  name="from"
                  value={dates.from}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="filter-field">
                <span>End Date:</span>
                <input
                  type="date"
                  name="to"
                  value={dates.to}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <button type="submit" className="btn filter-btn">
              Filter
            </button>
            <button className="btn">To Filter By Location Click Here</button>
            <p className="info-text">
              <FaInfoCircle />
              On The Chart Below Click On The Creator<br></br> Name in Order To
              See His Contact Details
            </p>
          </form>
        </div>
        {userContactCard ? (
          <div>
            <UserContactCard />
          </div>
        ) : null}
      </div>
      <CustomizedTables
        columns={columns}
        rows={rows}
        getUserContactInfo={getUserContactInfoByName}
      />
    </div>
  );
}

export default JamSessionsTable;
