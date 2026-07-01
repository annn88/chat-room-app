import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../firebase";

function Sidebar({ currentRoom, setCurrentRoom }) {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState("");

  // Fetch rooms in alphabetical order
  useEffect(() => {
    const q = query(collection(db, "rooms"), orderBy("name"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const roomList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRooms(roomList);
    });

    return () => unsubscribe();
  }, []);

  // Create a new room
  const createRoom = async () => {
    const roomName = newRoom.trim();

    // Prevent empty room names
    if (!roomName) return;

    // Limit room name length
    if (roomName.length > 20) {
      alert("Room name must be 20 characters or less.");
      return;
    }

    // Prevent duplicate rooms
    const exists = rooms.some(
      (room) => room.name.toLowerCase() === roomName.toLowerCase()
    );

    if (exists) {
      alert("Room already exists!");
      return;
    }

    // Add room to Firestore
    await addDoc(collection(db, "rooms"), {
      name: roomName,
      createdBy: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    // Automatically switch to the new room
    setCurrentRoom(roomName);

    // Clear input
    setNewRoom("");

    // Success message
    alert("Room created successfully!");
  };

  return (
    <div className="sidebar">
      <h2>Chat Rooms</h2>

      {rooms.map((room) => (
        <button
          key={room.id}
          className={currentRoom === room.name ? "active" : ""}
          onClick={() => setCurrentRoom(room.name)}
        >
          {room.name}
        </button>
      ))}

      <hr />

      <input
        type="text"
        placeholder="Enter room name..."
        value={newRoom}
        maxLength={20}
        onChange={(e) => setNewRoom(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createRoom();
          }
        }}
      />

      <button
        onClick={createRoom}
        disabled={!newRoom.trim()}
      >
        + Create Room
      </button>
    </div>
  );
}

export default Sidebar;