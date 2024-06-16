import { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { fetchAllNotifications } from "../../api/index";

const SOCKET_URL = "http://localhost:3000";
const NotificationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useNotifications = () => useContext(NotificationContext);

// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const token = Cookies.get("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to the server!");
    });

    socket.on("movieAdded", async (data) => {
      console.log(data.message);
      const response = await fetchAllNotifications(options);
      setNotifications(response.messages);
    });

    const fetchNotifications = async () => {
      try {
        const response = await fetchAllNotifications(options);
        setNotifications(response.messages);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();

    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};