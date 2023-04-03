import { useState } from "react";
import { useCookie } from "./useCookies";

const useLogin = (dispatch) => {
  const [token, setToken] = useCookie("userToken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        dispatch({ type: "LOGIN", payload: data.user });
        setEmail("");
        setPassword("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      console.log(error);
    }
  };

  return { handleLogin, email, setEmail, password, setPassword, error };
};

export default useLogin;
