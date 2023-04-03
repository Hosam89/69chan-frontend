import { createContext, useReducer } from "react";
import { useCookie } from "../hooks/useCookies";
import useLogin from "../hooks/uselogin";
import useLogout from "../hooks/useLogout";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, error: "" };

    case "LOGOUT":
      return { ...state, user: null, error: "" };

    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true, error: "" };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useCookie("userToken");
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    error: "",
  });

  const { handleLogin, email, setEmail, password, setPassword, error } =
    useLogin(dispatch);
  const { handleLogout } = useLogout(dispatch);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        handleLogin,
        email,
        setEmail,
        password,
        setPassword,
        error,
        handleLogout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
