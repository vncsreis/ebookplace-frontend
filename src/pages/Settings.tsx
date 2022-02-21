import { useEffect, useState } from "react";
import { useAppContext } from "../data/hooks/useAppContext";
import { PencilIcon } from "../icons";
import { tw } from "../utilities/tw";

interface Inputs {
  picture: boolean;
  name: boolean;
  email: boolean;
  password: boolean;
}

export function Settings() {
  const { uiCtx, authCtx } = useAppContext();
  const { profile } = authCtx;
  const [inputs, setInputs] = useState<Inputs>({
    picture: false,
    name: false,
    email: false,
    password: false,
  });
  const [name, setName] = useState<string>();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function validateChanges() {
    if (password !== confirmPassword) {
      window.alert("passwords don't match");
    }
    if (email?.length === 0 || (inputs.password && password?.length === 0)) {
      window.alert("fill all fields");
    }

    window.alert("changes saved");
  }

  useEffect(() => {
    setName(authCtx.profile?.name as string);
    setEmail(authCtx.profile?.email as string);
  }, [authCtx.profile]);

  return (
    <div
      className={tw(
        "h-full w-full",
        "flex flex-col items-center justify-center",
        "transition-colors",
        "bg-indigo-200 dark:bg-slate-700"
      )}
    >
      <div
        className={tw(
          "w-3/4 h-full my-6",
          "dark:bg-gray-800 bg-gray-50",
          "flex justify-center items-center",
          "rounded-lg"
        )}
      >
        <div className={tw("w-full h-full p-16 flex flex-col")}>
          <div className={tw("flex items-center", "mx-16")}>
            <div className={tw("relative group")}>
              <div
                className={tw(
                  "h-40 w-40",
                  "rounded-full",
                  "overflow-clip",
                  "flex justify-center items-center",
                  "bg-slate-500 dark:bg-slate-900"
                )}
              >
                <img
                  className={tw("max-h-full")}
                  src={
                    profile
                      ? `http://127.0.0.1:3030/static/${profile.picture}`
                      : "/"
                  }
                  alt={profile?.name}
                />
              </div>
              <div
                onClick={() => setInputs({ ...inputs, picture: true })}
                className={tw(
                  "h-full w-full",
                  "absolute top-0",
                  "bg-black bg-opacity-80",
                  "rounded-full",
                  "flex flex-col items-center justify-center",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "cursor-pointer"
                )}
              >
                <PencilIcon width={14} height={14} color="white" />
              </div>
            </div>

            <div className={tw("group", "flex items-center", "w-80")}>
              {inputs.name ? (
                <input
                  className={tw("text-xl", "text-gray-900", "w-3/5", "ml-16")}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <h1
                  className={tw(
                    "text-5xl",
                    "text-gray-900 dark:text-gray-100",
                    "ml-16"
                  )}
                >
                  {name}
                </h1>
              )}
              <div
                onClick={() => setInputs({ ...inputs, name: !inputs.name })}
                className={tw(
                  "ml-auto",
                  "bg-indigo-600",
                  "rounded-full",
                  "p-2",
                  "cursor-pointer",
                  "opacity-0 group-hover:opacity-100 transition-opacity",
                  "flex items-center justify-center"
                )}
              >
                <PencilIcon width={6} height={6} color="white" />
              </div>
            </div>
          </div>
          <hr className={tw("mt-10 mb-20 mx-24 border-gray-500")} />
          <div className={tw("w-2/4 mx-64 flex-1 flex flex-col ")}>
            <ul
              className={tw(
                "text-gray-900 dark:text-gray-100",
                "text-2xl",
                "flex flex-col gap-6"
              )}
            >
              <li className={tw("flex items-center w-full group")}>
                <div>
                  <span className={tw("italic mr-6")}>Email:</span>{" "}
                  {inputs.email ? (
                    <input
                      className={tw("text-xl", "text-gray-900")}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <span>{email}</span>
                  )}
                </div>
                <div
                  onClick={() => setInputs({ ...inputs, email: !inputs.email })}
                  className={tw(
                    "ml-auto",
                    "bg-indigo-600",
                    "rounded-full",
                    "p-2",
                    "cursor-pointer",
                    "opacity-0 group-hover:opacity-100 transition-opacity"
                  )}
                >
                  <PencilIcon width={6} height={6} color="white" />
                </div>
              </li>
              <li className={tw("flex items-center w-full group")}>
                <div>
                  <span className={tw("italic mr-6")}>Password:</span>{" "}
                  {inputs.password ? (
                    <input
                      className={tw("text-xl", "text-gray-900")}
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  ) : (
                    <span>************</span>
                  )}
                </div>
                <div
                  onClick={() =>
                    setInputs({ ...inputs, password: !inputs.password })
                  }
                  className={tw(
                    "ml-auto",
                    "bg-indigo-600",
                    "rounded-full",
                    "p-2",
                    "cursor-pointer",
                    "opacity-0 group-hover:opacity-100 transition-opacity"
                  )}
                >
                  <PencilIcon width={6} height={6} color="white" />
                </div>
              </li>
              {inputs.password ? (
                <li className={tw("flex items-center w-full group")}>
                  <div>
                    <span className={tw("italic mr-6")}>Confirm Password:</span>{" "}
                    <input
                      className={tw("text-xl", "text-gray-900")}
                      type="text"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </li>
              ) : null}
            </ul>
            <div className={tw("w-full", "mt-auto", "flex justify-end")}>
              <button
                onClick={() => {
                  uiCtx.changeMessage("Save changes to profile?");
                  uiCtx.toggleModal();
                  uiCtx.changeModalAction(validateChanges);
                }}
                className={tw("p-6 bg-indigo-600 rounded-lg text-white")}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
