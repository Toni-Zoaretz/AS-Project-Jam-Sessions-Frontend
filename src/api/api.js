import axios from "axios";

const api = axios.create({
  baseURL: "https://jam-sessions-db.cyclic.app/api/v1",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
