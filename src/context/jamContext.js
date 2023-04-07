import { useState, createContext, useContext } from "react";
const GlobalContext = createContext();

const JamContextProvider = ({ children }) => {
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

  return (
    <GlobalContext.Provider
      value={{
        jamSessionFormData,
        setJamSessionFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { JamContextProvider };
