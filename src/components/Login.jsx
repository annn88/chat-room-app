import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>💬 ChatHub</h1>

        <p>
          Real-time Chat Application
          <br />
          built with React & Firebase
        </p>

        <button onClick={signInWithGoogle}>
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />

          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;