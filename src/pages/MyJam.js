import { useUserGlobalContext } from "../context/userContext";

function MyJam() {
  const { currentUser } = useUserGlobalContext();
  console.log(currentUser);
  return (
    <div>
      <h2>My Jam`s</h2>
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
              <td data-label="Jam Session Name">{jam.jamSessionName}</td>
              <td data-label="Jam Session Address">
                {jam.location.formattedAddress}
              </td>
              <td data-label="Jam Instruments">{jam.instruments}</td>
              <td data-label="Jam Date">{jam.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyJam;
