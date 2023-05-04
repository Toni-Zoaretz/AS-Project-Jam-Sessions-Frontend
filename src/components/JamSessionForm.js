import api from "../api/api";
import { useParams } from "react-router-dom";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { useUserGlobalContext } from "../context/userContext";
import Input from "./Input";

import { useNavigate } from "react-router-dom";

function JamSessionForm() {
  const navigate = useNavigate();

  const {
    jamSessionFormData,
    setJamSessionFormData,
    jamSessionId,
    setJamSessionId,
    updateFormData,
    setUpdateFormData,
  } = useJamSessionGlobalContext();

  const { setCurrentUser, currentUser } = useUserGlobalContext();

  const { userId } = useParams();

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setJamSessionFormData((prevJamSessionFormData) => {
      return {
        ...prevJamSessionFormData,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const address = `${jamSessionFormData.streetNumber} ${jamSessionFormData.streetName} St, ${jamSessionFormData.cityName}, ${jamSessionFormData.countryName}`;

    try {
      if (jamSessionId) {
        await api.put(`jam-sessions/${jamSessionId}`, {
          jamSessionName: jamSessionFormData.jamSessionName,
          instruments: jamSessionFormData.instruments,
          address,
          date: jamSessionFormData.date,
        });
        setJamSessionId(null);
      } else {
        await api.post(`/jam-sessions/${userId}`, {
          jamSessionName: jamSessionFormData.jamSessionName,
          instruments: jamSessionFormData.instruments,
          address,
          date: jamSessionFormData.date,
        });
      }
      const response = await api.get(`/jam-user/${userId}`);
      setCurrentUser(response.data);
    } catch (error) {
      console.error(error);
    }

    setUpdateFormData(false);
    setJamSessionFormData({
      jamSessionName: "",
      instruments: "",
      streetName: "",
      streetNumber: "",
      cityName: "",
      countryName: "",
      date: "",
    });
    navigate(`/my-jam/${currentUser.id}`);
  };

  const inputs = [
    {
      type: "text",
      name: "jamSessionName",
      placeholder: "Jam Session Name",
    },
    {
      type: "text",
      name: "instruments",
      placeholder: "Instruments",
    },
    {
      type: "text",
      name: "streetName",
      placeholder: "St name",
    },
    {
      type: "text",
      name: "cityName",
      placeholder: "City Name",
    },
    {
      type: "text",
      name: "countryName",
      placeholder: "Country Name",
    },
    {
      type: "date",
      name: "date",
    },
  ];

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h3>
          {updateFormData
            ? "Update Your Jam Session!"
            : "Create Your Own Jam Session!"}
        </h3>
        {inputs.map((inputElement, index) => (
          <Input
            {...inputElement}
            key={index}
            onChange={handleChange}
            value={jamSessionFormData[inputElement.name]}
          />
        ))}
        <button className="btn" type="submit">
          {updateFormData ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default JamSessionForm;
