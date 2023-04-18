export const loginValidation = (
  allUsersArray,
  userEmail,
  userPassword,
  setError
) => {
  const userValidation = allUsersArray.find((usersList) => {
    return usersList.email === userEmail && usersList.password === userPassword;
  });
  if (userValidation) {
    return true;
  } else {
    setError("Email and Password Not Match");
    return false;
  }
};
