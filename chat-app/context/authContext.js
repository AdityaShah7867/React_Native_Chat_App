import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const [currentChat,setCurrentChat] = useState(null);

  const [shouldUpdate, setShoulUpdate] = useState(false)

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem("auth");
        if (data) {
          const parseData = JSON.parse(data);
          setAuth((prevAuth) => ({
            ...prevAuth,
            user: parseData.user,
            token: parseData.token,
          }));
        }
      } catch (error) {
        console.error("Error fetching auth data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, currentChat, setCurrentChat,shouldUpdate, setShoulUpdate }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
