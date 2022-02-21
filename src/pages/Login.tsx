import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/layouts/PageLayout";
import { useAppContext } from "../data/hooks/useAppContext";
import { tw } from "../utilities/tw";
import axios from "../config/axios";
import { BookIcon } from "../icons";

export function Login() {
  const { authCtx } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOnLogin, setIsOnLogin] = useState(true);

  const navigate = useNavigate();

  function clearInputs() {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.token) {
        const profile = {
          email: data.email,
          id: data.id,
          name: data.name,
          picture: data.picture,
        };
        authCtx.updateProfile(profile);
        authCtx.updateToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("profile", JSON.stringify(profile));
        navigate("/");
      }
    } catch (e) {
      window.alert(e);
    }
  }

  function onCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    if (password === confirmPassword) {
      window.alert("account created");
    } else {
      window.alert("passwords don't match");
    }
  }

  const LoginForm = (
    <div
      className={tw(
        "w-3/5 h-full",
        "flex flex-col items-center justify-center"
      )}
    >
      <form className={tw("flex flex-col gap-6 ", "w-3/5")} onSubmit={onLogin}>
        <div className={tw("flex flex-col gap-2")}>
          <label>E-mail</label>
          <input
            className={tw(
              "rounded-sm",
              "h-12 p-2",
              "text-gray-900",
              "text-xl",
              "border-indigo-400 border-2 dark:border-0"
            )}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={tw("flex flex-col gap-2")}>
          <label>Password</label>
          <input
            className={tw(
              "rounded-sm",
              "h-12 p-2",
              "text-gray-900",
              "text-xl",
              "border-indigo-400 border-2 dark:border-0"
            )}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={tw(
            "mt-6",
            "bg-indigo-600",
            "h-16 p-4",
            "rounded-sm",
            "text-xl",
            "text-white"
          )}
        >
          Login
        </button>
      </form>
      <div className={tw("mt-24")}>
        <h4 className={tw("italic text-gray-500", "text-lg")}>
          Or{" "}
          <button
            onClick={() => {
              setIsOnLogin((prevState) => !prevState);
              clearInputs();
            }}
            type="button"
            className={tw("italic text-indigo-500", "font-semibold")}
          >
            create an account
          </button>
        </h4>
      </div>
    </div>
  );

  const CreateForm = (
    <div
      className={tw(
        "w-3/5 h-full",
        "flex flex-col items-center justify-center"
      )}
    >
      <form
        className={tw("flex flex-col gap-6 ", "w-3/5")}
        onSubmit={onCreateAccount}
      >
        <div className={tw("flex flex-col gap-2")}>
          <label>E-mail</label>
          <input
            className={tw(
              "rounded-sm",
              "h-12 p-2",
              "text-gray-900",
              "text-xl",
              "border-indigo-400 border-2 dark:border-0"
            )}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={tw("flex flex-col gap-2")}>
          <label>Password</label>
          <input
            className={tw(
              "rounded-sm",
              "h-12 p-2",
              "text-gray-900",
              "text-xl",
              "border-indigo-400 border-2 dark:border-0"
            )}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={tw("flex flex-col gap-2")}>
          <label>Confirm Password</label>
          <input
            className={tw(
              "rounded-sm",
              "h-12 p-2",
              "text-gray-900",
              "text-xl",
              "border-indigo-400 border-2 dark:border-0"
            )}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className={tw(
            "mt-6",
            "bg-indigo-600",
            "h-16 p-4",
            "rounded-sm",
            "text-xl",
            "text-white"
          )}
        >
          Create Account
        </button>
      </form>
      <div className={tw("mt-24")}>
        <h4 className={tw("italic text-gray-500", "text-lg")}>
          Already have an account?{" "}
          <button
            onClick={() => {
              setIsOnLogin((prevState) => !prevState);
              clearInputs();
            }}
            type="button"
            className={tw("italic text-indigo-500", "font-semibold")}
          >
            Log in
          </button>
        </h4>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div
        className={tw(
          "h-full w-full",
          "flex flex-col",
          "items-center justify-center",
          "bg-indigo-400 dark:bg-slate-700"
        )}
      >
        <div
          className={tw(
            "bg-gray-50 dark:bg-gray-900",
            "h-3/4 w-3/4",
            "text-gray-800 dark:text-gray-200",
            "flex items-center",
            "rounded-lg"
          )}
        >
          <div
            className={tw(
              "w-2/5 h-3/4",
              "border-r-2 border-gray-500",
              "flex flex-col items-center"
            )}
          >
            <BookIcon height={36} width={36} />
            <h1 className={tw("text-6xl font-bold", "mt-10")}>Ebookplace</h1>
          </div>
          {isOnLogin ? LoginForm : CreateForm}
        </div>
      </div>
    </PageLayout>
  );
}
