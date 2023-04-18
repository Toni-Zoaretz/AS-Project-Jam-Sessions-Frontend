import { useUserGlobalContext } from "../context/userContext";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { formatTimestamp } from "../Utils/formatTimestamp.js";
import { useParams } from "react-router-dom";
import api from "../api/api";

function MyJamPage() {
  const { currentUser, setCurrentUser } = useUserGlobalContext();

  const {
    setAllJamSessions,
    setUpdateFormData,
    setJamSessionId,
    setJamSessionFormData,
  } = useJamSessionGlobalContext();

  const { userId } = useParams();

  const deleteJamSession = async (jamSessionId) => {
    try {
      await api.delete(`/jam-sessions/${jamSessionId}`);
      setAllJamSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== jamSessionId)
      );
      const response = await api.get(`/jam-user/${userId}`);
      console.log(response.data);
      console.log("😊 The Respond above in the Current User from Delete");
      setCurrentUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getOneJamDataByName = async (jamSessionName) => {
    try {
      const response = await api.get(`/jam-sessions/name/${jamSessionName}`);
      console.log(response.data._id);
      console.log(response.data._id + "😍");
      setUpdateFormData(true);
      setJamSessionId(response.data._id);
      setJamSessionFormData({
        jamSessionName: response.data.jamSessionName,
        instruments: response.data.instruments,
        streetName: response.data.location.street.split(" ")[1],
        streetNumber: response.data.location.street.split(" ")[0],
        cityName: response.data.location.city,
        zipcode: response.data.location.zipcode,
        countryName: response.data.location.country,
        date: response.data.date.split("T")[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currentUser);
  console.log("💙💙💙 The User above its the Current User for this page");

  return (
    <div className="page myJamPage-container">
      <div className="myJam-title">
        <h3>My Jam`s</h3>
      </div>
      {currentUser.length !== 0 ? (
        <div className="myJam-table">
          <table>
            <thead>
              <tr>
                <th scope="col">Jam Session Name</th>
                <th scope="col">Jam Session Address</th>
                <th scope="col">Jam Instruments</th>
                <th scope="col">Jam Date</th>
              </tr>
            </thead>
            <tbody>
              {currentUser?.jamSession_id.map((jam, jamIndex) => (
                <tr key={jamIndex}>
                  <td data-label="Jam Session Name">
                    <button
                      className="btn myJam-btn"
                      onClick={() => getOneJamDataByName(jam.jamSessionName)}
                    >
                      Update
                    </button>
                    {jam.jamSessionName}
                    <button
                      className="btn myJam-btn"
                      onClick={() => deleteJamSession(jam._id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td data-label="Jam Session Address">
                    {jam.location.formattedAddress}
                  </td>
                  <td data-label="Jam Instruments">{jam.instruments}</td>
                  <td data-label="Jam Date">{formatTimestamp(jam.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p className="myJamPage-message">
            You have to LOGIN / REGISTER and Create a jam session In order to
            see it on that page
            <button className="btn">Click Here to Register</button>
            <button className="btn login-btn">Click Here to Login</button>
          </p>
        </>
      )}
    </div>
  );
}

export default MyJamPage;
