import { useEffect, useRef, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import Message from "./Message";
import MessageInput from "./MessageInput";

function Chat({ room }) {
  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  // Fetch messages
  useEffect(() => {
    const q = query(
      collection(db, room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, [room]);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send Message
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    await addDoc(collection(db, room), {
      text,
      name: auth.currentUser.displayName,
      photo: auth.currentUser.photoURL,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="chat-container">
      <h2>{room} Chat</h2>

      <div className="messages">
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "120px",
              color: "#6b7280",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            💬 No messages yet
            <br />
            <br />
            Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              currentUser={auth.currentUser}
            />
          ))
        )}

        <div ref={bottomRef}></div>
      </div>

      <MessageInput
        sendMessage={sendMessage}
        room={room}
      />
    </div>
  );
}

export default Chat;