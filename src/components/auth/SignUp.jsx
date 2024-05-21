import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link } from 'react-router-dom';
import AuthDetails from "./AuthDetails";
import "../styles/SignUp.css"; // импорт файла стилей

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPassword, setCopyPassword] = useState("");
  const [error, setError] = useState("");
  function register(e) {
    e.preventDefault();
    if (copyPassword !== password) {
      setError("Passwords didn't match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user);
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="form-container">
      <form onSubmit={register}>
        <h2>Create an account</h2>
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
        <input
          placeholder="Please enter your password again"
          value={copyPassword}
          onChange={(e) => setCopyPassword(e.target.value)}
          type="password"
        />
        <button>Create</button>
        {error ? <p style={{ color: "red" }}>{error}</p> : ""}
      </form>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
      <AuthDetails />
    </div>
  );
};

export default SignUp;  