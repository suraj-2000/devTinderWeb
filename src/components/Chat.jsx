import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
    const { targetId } = useParams();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const location = useLocation();
    const { firstName, lastName, photoUrl } = location.state || {};

    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const fetchChatMessages = async () => {
        try {
            const chat = await axios.get(
                BASE_URL + "/chat/" + targetId,
                {
                    withCredentials: true,
                }
            );
            const chatMessages = chat.data.messages.map((msg) => ({
                userId: msg.senderId._id,
                firstName: msg.senderId.firstName,
                lastName: msg.senderId.lastName,
                photoUrl: msg.senderId.photoUrl,
                text: msg.text,
            }));

            setMessages(chatMessages);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchChatMessages();
    }, [targetId]);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();

        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetId,
        });
        socket.on("messageReceived", (data) => {
            setMessages((messages) => [
                ...messages,
                {
                    userId: data.userId,
                    firstName: data.firstName,
                    text: data.text,
                },
            ]);
        });
        return () => {
            socket.disconnect();
        };

    }, [userId, targetId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const socket = createSocketConnection();

        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            targetId,
            text: newMessage,
        });

        setNewMessage("");
    };

    return (
        <div className="flex justify-center mt-6 mb-20 px-3">
            <div className="w-full max-w-2xl h-[calc(100vh-220px)] sm:h-[70vh] bg-base-100 rounded-2xl shadow-xl flex flex-col border border-base-300 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 p-4 border-b border-base-300 bg-base-200">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img
                                src={
                                    photoUrl ||
                                    "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                                }
                                alt="profile"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg">
                            {firstName} {lastName}
                        </h2>
                    </div>
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-base-200/30">

                    {messages.map((msg, index) => (
                        <div key={index}>

                            {String(msg.userId) === String(userId) ? (

                                <div className="chat chat-end">

                                    <div className="chat-header">
                                        {msg.firstName}
                                    </div>

                                    <div className="chat-bubble">
                                        {msg.text}
                                    </div>
                                </div>

                            ) : (

                                <div className="chat chat-start">
                                    <div>
                                        <div className="chat-header">
                                            {msg.firstName}
                                        </div>

                                        <div className="chat-bubble">
                                            {msg.text}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Input */}
                <div className="border-t border-base-300 p-4 bg-base-100">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="input input-bordered flex-1 rounded-full"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />

                        <button
                            className="btn btn-primary rounded-full px-6"
                            onClick={sendMessage}
                            disabled={!newMessage.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;