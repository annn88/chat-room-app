function Message({ message, currentUser }) {
  const isMe = message.name === currentUser.displayName;

  return (
    <div className={`message ${isMe ? "my-message" : ""}`}>
      {!isMe && (
        <img
          src={message.photo || "https://via.placeholder.com/40"}
          alt="profile"
          className="avatar"
        />
      )}

      <div className="message-content">
        <h4>{message.name}</h4>

        <div className="bubble">
          {message.text}
        </div>

        {message.createdAt?.seconds && (
          <small>
            {new Date(
              message.createdAt.seconds * 1000
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </small>
        )}
      </div>

      {isMe && (
        <img
          src={message.photo || currentUser.photoURL}
          alt="profile"
          className="avatar"
        />
      )}
    </div>
  );
}

export default Message;