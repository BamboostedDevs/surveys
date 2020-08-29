import React, { useContext, useState } from "react";

const AppContext = React.createContext();

function AppProvider({ Component, pageProps }) {
  const [session, setSession] = useState(false);
  const [theme, setTheme] = useState("default");
  return (
    <AppContext.Provider value={{ session, setSession, theme, setTheme }}>
      <App Component={Component} pageProps={pageProps} />
    </AppContext.Provider>
  );
}

function App({ Component, pageProps }) {
  const appContext = useContext(AppContext);
  return <Component {...{ ...pageProps, ...{ appContext } }} />;
}

export default AppProvider;
