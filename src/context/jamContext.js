import api from "../api/api";
import { useState, createContext, useContext } from "react";
const JamSessionContext = createContext();

const JamContextProvider = ({ children }) => {
  const [updateFormData, setUpdateFormData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterButton, setFilterButton] = useState(false);
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
    date: "",
  });

  const getAllJamSessions = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/jam-sessions");
      const allJamSessionsArray = response.data.data;
      setAllJamSessions(allJamSessionsArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
        jamSessionId,
        setJamSessionId,
        updateFormData,
        setUpdateFormData,
        isLoading,
        setIsLoading,
        filterButton,
        setFilterButton,
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
