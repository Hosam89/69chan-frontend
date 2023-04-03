import { useCookie } from "./useCookies";

const useLogout = (dispatch) => {
  const [token, setToken] = useCookie("userToken");

  const handleLogout = () => {
    setToken("");
    dispatch({ type: "LOGOUT" });
  };

  return { handleLogout, token };
};

export default useLogout;
