import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Dashboard(props) {
  const { currentUser, logout } = useContext(AuthContext);
  const [error, setError] = useState();
  const history = useHistory();

  async function handleClick(e) {
    e.preventDefault();

    try {
      setError("");
      await logout();
      history.push("/login");
    } catch {
      setError("Error loggin out");
    }
  }

  return (
    <>
      <h2>Dashboard</h2>
      {currentUser.email}
      {error && <p>{error}</p>}
      <Link to="/edit-profile">Update profile</Link>
      <button onClick={handleClick}>Log out</button>
    </>
  );
}

export default Dashboard;
