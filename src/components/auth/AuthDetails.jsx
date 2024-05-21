import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Link } from 'react-router-dom';
const AuthDetails = () => {
  const [authUser, setAuthUset] = useState(null);  
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUset(user);
      } else {
        setAuthUset(null);
      }
    });
    return () => {
      listen();
    };
  }, []);
  function userSignOut() {
    signOut(auth)
      .then(() => console.log("success"))
      .catch((e) => console.log(e));
  }
  return (
    <div>
      {authUser ? (
        <div>
          <p>{`Signed in as ${authUser.email}`}</p>
          <p>Now you can go to main page <Link to="/MainPage">Main Page, let's go!</Link></p>
          <button onClick={userSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Right now you are signed out, please log in</p>
      )}
    </div>
  );
};
export default AuthDetails;