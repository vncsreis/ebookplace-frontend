import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { useAppContext } from "./data/hooks/useAppContext";
import "./index.css";

// TODO: Store only token and id on localstorage / request user data by id on reload
export function App() {
  const { uiCtx, authCtx } = useAppContext();

  const navigate = useNavigate();
  const location = useLocation();

  function authenticate() {
    if (
      authCtx.token ||
      authCtx.profile ||
      localStorage.getItem("token") ||
      localStorage.getItem("profile") ||
      location.pathname === "/login"
    ) {
      return <Outlet />;
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!authCtx.token || !authCtx.profile) {
      if (
        localStorage.getItem("token") !== undefined &&
        localStorage.getItem("profile") !== undefined
      ) {
        const token = localStorage.getItem("token") as string;
        const profile = localStorage.getItem("profile") as string;
        authCtx.updateToken(token);
        authCtx.updateProfile(JSON.parse(profile));
      }
    }
  }, []);

  return (
    <div
      className={`${uiCtx.isDarkMode ? "dark" : ""} h-full transition-colors`}
    >
      <div className="flex flex-col h-full dark:bg-slate-700 bg-indigo-50">
        {authenticate()}
      </div>
    </div>
  );
}
