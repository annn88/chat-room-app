import { FaComments, FaCode, FaFilm, FaMusic } from "react-icons/fa";

function Sidebar({ currentRoom, setCurrentRoom }) {
  const rooms = [
    { name: "General", icon: <FaComments /> },
    { name: "Coding", icon: <FaCode /> },
    { name: "Movies", icon: <FaFilm /> },
    { name: "Music", icon: <FaMusic /> },
  ];

  return (
    <div className="sidebar">
      <h2>Chat Rooms</h2>

      {rooms.map((room) => (
        <button
          key={room.name}
          className={currentRoom === room.name ? "active" : ""}
          onClick={() => setCurrentRoom(room.name)}
        >
          {room.icon} {room.name}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;