import { auth, provider } from "../config/firebase"; 
import { signInWithPopup } from "firebase/auth";
// import authorization service from firebase (Google sign-in)

import { useNavigate } from "react-router-dom";

// Login function that sign's user in with their google account
export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    // Pop up to authorize sign in
    console.log(result);
    navigate("/");
    // Redirects user to the home page
  };

  return (
    // Page's content in JSX
    <div className="sign-in">
      <p className="sign-in-text"> Sign in with Google to continue</p>
      <button className="sign-in-button" onClick={signInWithGoogle}> Sign in with Google</button>
    </div>
  );
};
