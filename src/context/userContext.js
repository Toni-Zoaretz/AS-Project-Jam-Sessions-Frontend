import { useState, createContext, useContext } from "react";
const GlobalContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });

  return (
    <GlobalContext.Provider
      value={{
        userFormData,
        setUserFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { UserContextProvider };
