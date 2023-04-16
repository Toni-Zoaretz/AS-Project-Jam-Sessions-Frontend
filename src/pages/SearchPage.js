import { useEffect } from "react";
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
    <div className="page">
      <JamSessionsTable />
      <JamSessionMap />
      <MapChart />
    </div>
  );
}

export default SearchPage;
