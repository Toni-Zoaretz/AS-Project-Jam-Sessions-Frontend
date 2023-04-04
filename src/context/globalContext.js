import { useState, createContext, useContext } from "react";
const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [jamInformation, setJamInformation] = useState({
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
        formData,
        setFormData,
        user,
        setUser,
        jamInformation,
        setJamInformation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContextProvider };
