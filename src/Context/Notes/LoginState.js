import React, { useState,useEffect } from "react";
import LoginContext from "./LoginContext";

const LoginState = (props) => {
  const [isLogged, setLog] = useState([]);

  useEffect(() => {
      if(localStorage.Token){
        setLog(true);
      }
      else setLog(false);
    },[]);

  return (
    <LoginContext.Provider value={{ isLogged, setLog }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
