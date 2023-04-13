import api from "../api/api";
import { useState, createContext, useContext, useEffect } from "react";
const JamSessionContext = createContext();

const JamContextProvider = ({ children }) => {
  const [allJamSessions, setAllJamSessions] = useState([]);
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
