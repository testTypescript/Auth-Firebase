import { useRef, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function EditProfile() {
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { updatePassword } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (passwordRef.current.value !== confirmRef.current.value) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await updatePassword(passwordRef.current.value);
      setMessage("Successfully changed password");
    } catch {
      setMessage("Error updating password");
    }
  }

  return (
    <>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {message && <p>{message}</p>}
        <label>Password</label>
        <input
          type="password"
          placeholder="Leave blank to not update"
          ref={passwordRef}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Leave blank to not update"
          ref={confirmRef}
        />
        <button disabled={loading} type="submit">
          Update
        </button>
      </form>
      <Link to="/">Back to dashboard</Link>
    </>
  );
}

export default EditProfile;
