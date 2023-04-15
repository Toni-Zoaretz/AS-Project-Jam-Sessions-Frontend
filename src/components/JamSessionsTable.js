import React from "react";
import api from "../api/api.js";
import CustomizedTables from "../components/CustomizedTables.js";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { useUserGlobalContext } from "../context/userContext";
import { formatTimestamp } from "../Utils/formatTimestamp.js";

function JamSessionsTable() {
  const columns = ["Jam Session Name", "Creator", "Date", "Address"];
  const { dates, setDates, allJamSessions, setAllJamSessions } =
    useJamSessionGlobalContext();
  const { getUserContactInfoByName } = useUserGlobalContext();

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
      <form onSubmit={handleSubmit}>
        <span>Start Date</span>
        <input
          type="date"
          name="from"
          value={dates.from}
          onChange={handleChange}
        ></input>
        <span>End Date</span>
        <input
          type="date"
          name="to"
          value={dates.to}
          onChange={handleChange}
        ></input>
        <button type="submit">Filter</button>
      </form>
      JamSessionsTable
      <CustomizedTables
        columns={columns}
        rows={rows}
        getUserContactInfo={getUserContactInfoByName}
      />
    </div>
  );
}

export default JamSessionsTable;
