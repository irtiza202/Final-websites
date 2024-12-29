import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthContext } from "contexts/AuthContext";

export default function Login() {
  const { dispatch } = useAuthContext();
  const [state, setState] = useState({ email: "", password: "" });
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "SET_LOGGED_IN", payload: { user } });
      } else {
        dispatch({ type: "SET_LOGGED_OUT" });
      }
    });
  }, [dispatch]);

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        window.toastify("Login success", "success");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-credential":
            window.toastify("Wrong Email or Password", "error");
            break;
          default:
            window.toastify("Something went wrong or Network anomaly", "error");
            break;
        }
      });
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "SET_LOGGED_IN", payload: { user } });
      window.toastify("Logged in with Google", "success");
    } catch (error) {
      console.error("Google Sign-In error", error);
      window.toastify("Failed to log in with Google", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            required
          />
          <input
            type="password"
            onChange={handleChange}
            placeholder="Password"
            name="password"
            required
          />
          <button type="submit" className="register">Login</button>
        </form>
        <button className="button" onClick={handleGoogleSignIn}>
          Continue with Google
        </button>
        <Link to="/auth/register">New? Register here</Link>
      </div>
    </div>
  );
}
