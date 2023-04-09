import UserFormRegister from "../components/UserFormRegister";
import UserFormLogin from "../components/UserFormLogin";
function Home() {
  return (
    <div>
      Home
      <UserFormRegister />
      <br></br>
      <UserFormLogin />
    </div>
  );
}

export default Home;
