import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, firestore } from "config/firebase";
import { Link } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthContext } from "contexts/AuthContext";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [state, setState] = useState(initialState);
  const { dispatch } = useAuthContext();
  const provider = new GoogleAuthProvider();

  const handleChange = (e) =>
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));

  const addTodB = async (user) => {
    const userData = {
      fullName: state.fullName || user.displayName || "Anonymous",
      email: user.email,
      uid: user.uid,
      dateCreated: serverTimestamp(),
      isActive: true,
    };
    try {
      await setDoc(doc(firestore, "users", user.uid), userData);
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userData } });
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let { fullName, email, password, confirmPassword } = state;

    fullName = fullName.trim();

    if (fullName.length < 3) {
      return window.toastify("Please enter your full name", "error");
    }
    if (!window.isEmail(email)) {
      return window.toastify("Please enter a valid email address", "error");
    }
    if (password.length < 6) {
      return window.toastify("Password must be at least 6 chars.", "error");
    }
    if (confirmPassword !== password) {
      return window.toastify("Password doesn't match", "error");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        addTodB(user);
        console.log(userCredential);
        window.toastify("Registration success", "success");
      })
      .catch((error) => {
        console.error("error", error);
        switch (error.code) {
          case "auth/email-already-in-use":
            window.toastify("Email address already in use", "error");
            break;
          default:
            window.toastify("Something went wrong", "error");
            break;
        }
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      addTodB(user);
      window.toastify("Logged in with Google", "success");
    } catch (error) {
      console.error("Google Sign-In error", error);
      window.toastify("Failed to log in with Google", "error");
    }
  };

  return (
    <div className="login-page register-page">
      <div className="login-form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Full Name"
            name="fullName"
            required
          />
          <input
            onChange={handleChange}
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
          <button type="submit" className="register">Register</button>
        </form>
        <button className="button" onClick={handleGoogleSignIn}>
          Continue with Google
        </button>
        <Link to="/auth/login">Already registered? Login here</Link>
      </div>
    </div>
  );
}
