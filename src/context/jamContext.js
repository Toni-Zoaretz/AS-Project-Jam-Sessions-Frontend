import api from "../api/api";
import { useState, createContext, useContext } from "react";
const JamSessionContext = createContext();

const JamContextProvider = ({ children }) => {
  const [allJamSessions, setAllJamSessions] = useState([]);
  const [jamSessionId, setJamSessionId] = useState(null);
  const [location, setLocation] = useState({
    zipCode: "",
    distance: "",
  });
  const [dates, setDates] = useState({
    from: "",
    to: "",
  });
  const [jamSessionFormData, setJamSessionFormData] = useState({
    jamSessionName: "",
    instruments: "",
    streetName: "",
    streetNumber: "",
    cityName: "",
    countryName: "",
    zipcode: "",
    date: "",
  });

  const getAllJamSessions = async () => {
    try {
      const response = await api.get("/jam-sessions");
      const allJamSessionsArray = response.data.data;
      setAllJamSessions(allJamSessionsArray);
      console.log(allJamSessionsArray);
      console.log(allJamSessions);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneJamDataByName = async (jamSessionName) => {
    try {
      const response = await api.get(`/jam-sessions/name/${jamSessionName}`);
      console.log(response.data);
      console.log(response.data._id);
      console.log(response.data._id + "😍");
      setJamSessionId(response.data._id);
      setJamSessionFormData({
        jamSessionName: response.data.jamSessionName,
        instruments: response.data.instruments,
        streetName: response.data.location.street.split(" ")[1],
        streetNumber: response.data.location.street.split(" ")[0],
        cityName: response.data.location.city,
        zipcode: response.data.location.zipcode,
        countryName: response.data.location.country,
        date: response.data.date.split("T")[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------------------------------
  const deleteJamSession = async (id) => {
    try {
      await api.delete(`/jam-sessions/${id}`);
      // ------------
      setAllJamSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== id)
      );
      // ------------
    } catch (error) {
      console.log(error);
    }
  };

  // ----------------------------------------------

  return (
    <JamSessionContext.Provider
      value={{
        jamSessionFormData,
        setJamSessionFormData,
        getAllJamSessions,
        allJamSessions,
        setAllJamSessions,
        dates,
        setDates,
        location,
        setLocation,
        getOneJamDataByName,
        jamSessionId,
        setJamSessionId,
        deleteJamSession,
      }}
    >
      {children}
    </JamSessionContext.Provider>
  );
};

export const useJamSessionGlobalContext = () => {
  return useContext(JamSessionContext);
};

export { JamContextProvider };
