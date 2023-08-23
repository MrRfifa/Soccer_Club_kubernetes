import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [type, setType] = useState("nothing");
  const [userId, setUserId] = useState("nill");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  async function getLoggedIn() {
    try {
      const loggedInRes = await axios.get("http://localhost:3001/auth/loggedIn");
      setLoggedIn(loggedInRes.data.loggedIn);
      setType(loggedInRes.data.type);
      setUserId(loggedInRes.data.userid);
      setUsername(loggedInRes.data.username);
      setLastName(loggedInRes.data.lastName);
      setFirstName(loggedInRes.data.firstName);
    } catch (error) {
      // Handle error here (e.g., setLoggedIn(false), show an error message, etc.)
      console.error("Error fetching login status:", error);
      // You can also add more detailed error handling based on the error response
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        type,
        userId,
        username,
        lastName,
        firstName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
