export const registerValidation = (password, number, email, setError) => {
  if (!password || !number || !email) {
    setError("Some Fields Are Empty");
    return;
  }
  if (password.length < 6) {
    setError("Password Must Be At Least 6 Characters");
    return;
  }
  if (!/^(\+9725|\+972-5|9725|05)[-\s]?\d{8}$/.test(number)) {
    setError("Please Enter Israeli Number");
    return;
  }
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) {
    setError("Please Enter Valid Email");
    return;
  }
};
