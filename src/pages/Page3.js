import { useEffect } from "react";
import UserContactCard from "../components/UserContactCard";
import JamSessionMap from "../components/JamSessionsMap";
import MapChart from "../components/MapChart";
import JamSessionCalender from "../components/JamSessionCalender";
import JamSessionsTable from "../components/JamSessionsTable";
import { useJamSessionGlobalContext } from "../context/jamContext";

function Page3() {
  const { getAllJamSessions } = useJamSessionGlobalContext();

  useEffect(() => {
    getAllJamSessions();
  }, []);

  return (
    <div>
      Page3
      <JamSessionCalender />
      <JamSessionsTable />
      <UserContactCard />
      <JamSessionMap />
      <MapChart />
    </div>
  );
}

export default Page3;
