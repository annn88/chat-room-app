import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState("General");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // Login Screen
  if (!user) {
    return <Login />;
  }

  // Main Chat App
  return (
    <div className="app">
      <Sidebar
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
      />

      <div className="main">
        <Navbar user={user} />
        <Chat room={currentRoom} />
      </div>
    </div>
  );
}

export default App;