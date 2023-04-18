import api from "../api/api";
import { useState, createContext, useContext } from "react";
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [userContactInfo, setUserContactInfo] = useState([]);
  const [userContactCard, setUserContactCard] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  const [userLoginFormData, setUserLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [userRegisterFormData, setUserRegisterFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const getUserContactInfoByName = async (userName) => {
    try {
      const response = await api.get(`/jam-user/name/${userName}`);
      setUserContactCard(true);
      setUserContactInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userRegisterFormData,
        setUserRegisterFormData,
        currentUser,
        setCurrentUser,
        getUserContactInfoByName,
        userContactInfo,
        userLoginFormData,
        setUserLoginFormData,
        userContactCard,
        setUserContactCard,
        errorMessage,
        setErrorMessage,
        allUsers,
        setAllUsers,
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
