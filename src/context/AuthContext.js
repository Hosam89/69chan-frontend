// import { createContext, useReducer } from "react";

// export const AuthContext = createContext();

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     //User is trying to log in
//     case "LOGIN":
//       return { ...state, user: action.payload };
//     //User is logged out
//     case "LOGOUT":
//       return { ...state, user: null };
//     // User is logged in
//     case "AUTH_IS_READY":
//       return { user: action.payload, authIsReady: true };
//     default:
//       return state;
//   }
// };

// export const AuthContextProvider = ({ children }) => {
//   //useReducer initial state
//   const [state, dispatch] = useReducer(authReducer, {
//     //User info Object
//     user: null,
//     authIsReady: false,
//   });

//   return (
//     // Provider for the context so we can have a global contaxt provider
//     <AuthContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
