import { useState, useEffect } from "react";

export const useCookie = (name) => {
  const [cookieValue, setCookieValue] = useState(null);

  const setCookie = (value, maxAge) => {
    const date = new Date();
    const time = date.getTime();
    const expireTime = time + maxAge;
    date.setTime(expireTime);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    setCookieValue(value);
  };

  const removeCookie = () => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
    setCookieValue(null);
  };

  useEffect(() => {
    const cookie = document.cookie
      .split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${name}=`));
    if (cookie) {
      const value = cookie.split("=")[1];
      setCookieValue(value);
    }
  }, [name]);

  return [cookieValue, setCookie, removeCookie];
};
