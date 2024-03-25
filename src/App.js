import React, {useEffect, useMemo, useRef, useState, Provider} from 'react'
import "./style/app.css"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import MyNavbar from "./components/UI/navbar/MyNavbar";
import {SwitchTransition} from "react-transition-group";
import Error from "./pages/Error";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      if(localStorage.getItem('auth')) {
          setIsAuth(true)
      }
      setIsLoading(false)
  }, []);

  return(
      <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
          isLoading
      }}>
          <BrowserRouter>
              <MyNavbar/>
              <AppRouter/>
          </BrowserRouter>
      </AuthContext.Provider>
  );
}


export default App;
