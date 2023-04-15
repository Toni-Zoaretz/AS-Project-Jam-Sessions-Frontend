import { useEffect } from "react";
import UserContactCard from "../components/UserContactCard";
import JamSessionMap from "../components/JamSessionsMap";
import MapChart from "../components/MapChart";
import JamSessionsTable from "../components/JamSessionsTable";
import { useJamSessionGlobalContext } from "../context/jamContext";

function SearchPage() {
  const { getAllJamSessions } = useJamSessionGlobalContext();

  useEffect(() => {
    getAllJamSessions();
  }, []);

  return (
    <div>
      Search for a Jam!
      <JamSessionsTable />
      <UserContactCard />
      <JamSessionMap />
      <MapChart />
    </div>
  );
}

export default SearchPage;
