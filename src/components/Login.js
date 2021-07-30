import { useRef, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label>Email</label>
        <input type="email" required ref={emailRef} />
        <label>Password</label>
        <input type="password" required ref={passwordRef} />
        <button disabled={loading} type="submit">
          Login
        </button>
      </form>
      <Link to="/forgot-password">Forgot Password</Link>
      <div>
        No account? <Link to="/signup">Sign up here</Link>
      </div>
    </>
  );
}

export default Login;
