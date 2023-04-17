import UserFormRegister from "../components/UserFormRegister";
import UserFormLogin from "../components/UserFormLogin";
import { useState } from "react";

function HomePage() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="page homePage">
      <div>
        <h1> Welcome to the JAM SESSION App!</h1>
        <p className="description">
          Here you can create Jam Sessions and also find jam sessions next to
          your location..
        </p>
      </div>

      {showForm ? (
        <UserFormLogin setShowForm={setShowForm} />
      ) : (
        <UserFormRegister setShowForm={setShowForm} />
      )}
    </div>
  );
}

export default HomePage;
