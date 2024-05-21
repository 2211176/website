import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import AuthDetails from "./AuthDetails";
import "../styles/SignIn.css"; // импорт файла стилей
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function logIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        setError("SORRY, COULDN'T FIND YOUR ACCOUNT");
      });
  }

  return (
    <div className="form-container">
      <form>
        <h2>Log in</h2>
        <input
          placeholder="Please enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <input
          placeholder="Please enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button onClick={logIn}>Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        {error && <p className="error-message">{error}</p>}
      </form>
      <AuthDetails />
    </div>
  );
};

export default SignIn;