import { Link } from "react-router-dom";
// links like an a-tag from react
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
// sign out button 

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  // JSX for navbar
  return (
    <div className="navbar">
      <div className="logo">Totally not "anonymous"</div>
      <div className="links">
        <Link to="/">Home</Link>
        {!user ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/create-post">Create Post</Link>
        )}
      </div>
    
      <div className="user">
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img alt="displayPhoto" src={user?.photoURL || ""} />
            <button className="logoutbtn" onClick={signUserOut}>Log out</button>
          </>
        )}
      </div>
    </div>
  );
};
