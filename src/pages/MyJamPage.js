import { useUserGlobalContext } from "../context/userContext";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { formatTimestamp } from "../Utils/formatTimestamp.js";

function MyJamPage() {
  const { currentUser } = useUserGlobalContext();
  const { getOneJamDataByName, deleteJamSession } =
    useJamSessionGlobalContext();
  console.log(currentUser);

  return (
    <div className="page myJamPage-container">
      <div className="myJam-title">
        <h3>My Jam`s</h3>
      </div>
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
    </div>
  );
}

export default MyJamPage;
