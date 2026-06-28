import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar({ user }) {
  return (
    <div className="navbar">
      <h2>💬 ChatHub</h2>

      <div className="user-info">
        <img src={user.photoURL} alt={user.displayName} />
        <span>{user.displayName}</span>

        <button onClick={() => signOut(auth)}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;