import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();
import { parseJwt } from "../utils";

function AppProvider({ Component, pageProps }) {
  const [session, setSession] = useState(false);
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("default");
  const [surveys, setSurveys] = useState([]);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const _session = window.sessionStorage.getItem("session");
    if (_session) setSession(_session);
    if (session) {
      setRole(parseJwt(session).role || 0);
      window.sessionStorage.setItem("session", session);
    }
    console.log(_session, session, role);
  }, [session]);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        theme,
        setTheme,
        surveys,
        setSurveys,
        email,
        setEmail,
        role,
        setRole,
      }}
    >
      <App Component={Component} pageProps={pageProps} />
    </AppContext.Provider>
  );
}

function App({ Component, pageProps }) {
  const appContext = useContext(AppContext);
  return <Component {...{ ...pageProps, ...{ appContext } }} />;
}

export default AppProvider;
