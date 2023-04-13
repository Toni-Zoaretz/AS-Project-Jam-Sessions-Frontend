import { useUserGlobalContext } from "../context/userContext";

function UserContactCard() {
  const { userContactInfo } = useUserGlobalContext();
  console.log(userContactInfo);

  return (
    <div>
      UserContactForm
      <h3>Contact User and Jam</h3>
      <span>{userContactInfo.name}</span>
      <span>{userContactInfo.phoneNumber}</span>
      <span>{userContactInfo.email}</span>
    </div>
  );
}

export default UserContactCard;
