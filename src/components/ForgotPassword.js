import { useRef, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const emailRef = useRef();
  const [message, setMessage] = useState();
  const { resetPassword } = useContext(AuthContext);

  async function handleSubmit(e) {
    setMessage("");
    e.preventDefault();

    try {
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for instructions to reset password");
    } catch {
      setMessage("Failed to reset password");
    }
  }

  return (
    <>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        {message && <p>{message}</p>}
        <label>Email</label>
        <input type="email" required ref={emailRef} />
        <button type="submit">Reset</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default ForgotPassword;
