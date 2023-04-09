import { useEffect } from "react";
import JamSessionCalender from "../components/JamSessionCalender";
import JamSessionsTable from "../components/JamSessionsTable";
import { useJamSessionGlobalContext } from "../context/jamContext";

function Page3() {
  const { getAllJamSessions } = useJamSessionGlobalContext();
  // const { allJamSessions, setAllJamSessions, getAllJamSessions } =
  //   useJamSessionGlobalContext();

  useEffect(() => {
    getAllJamSessions();
  }, []);

  return (
    <div>
      Page3
      <JamSessionCalender />
      <JamSessionsTable
      // allJamSessions={allJamSessions}
      // setAllJamSessions={setAllJamSessions}
      />
    </div>
  );
}

export default Page3;
