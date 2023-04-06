import { useState, createContext, useContext } from "react";
const GlobalContext = createContext();

const JamContextProvider = ({ children }) => {
  const [jamSessionFormData, setJamSessionFormData] = useState({
    jamSessionName: "",
    instruments: "",
    address: "",
    //St name
    //nummber
    //zipcode
    //city
    //country
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
