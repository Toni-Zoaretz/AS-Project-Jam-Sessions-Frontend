import api from "../api/api";
import { useState, createContext, useContext } from "react";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [userFormData, setUserFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const getCurrentUser = async () => {
    const response = await api.get("/jam-user");
    try {
      // console.log(response.data);
      console.log(response.data[response.data.length - 1]);
      setCurrentUser(response.data[response.data.length - 1]);
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userFormData,
        setUserFormData,
        currentUser,
        setCurrentUser,
        getCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserGlobalContext = () => {
  return useContext(UserContext);
};

export { UserContextProvider };
