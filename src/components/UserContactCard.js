import { useUserGlobalContext } from "../context/userContext";
import { BsWhatsapp } from "react-icons/bs";

function UserContactCard() {
  const { userContactInfo } = useUserGlobalContext();
  console.log(userContactInfo);

  return (
    <div className="cards-container">
      <div className="card">
        <span className="user-card-title">
          {userContactInfo.name} Contact Details:
        </span>
        <div className="cards-items-container">
          <div className="card-items">
            <p>User Name:</p>
            <h4>{userContactInfo.name}</h4>
          </div>
          <div className="card-items">
            <p>User Phone Number:</p>
            <h4>{userContactInfo.phoneNumber}</h4>
          </div>
          <div className="card-items">
            <p>User Email:</p>
            <h4>{userContactInfo.email}</h4>
          </div>
        </div>
        <a
          href={`http://wa.me/${userContactInfo.phoneNumber}`}
          className="btn"
          target="blank"
        >
          Whatsapp {userContactInfo.name} <BsWhatsapp />
        </a>
      </div>
    </div>
  );
}

export default UserContactCard;
