import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { useAppContext } from "../data/hooks/useAppContext";
import { Profile } from "../data/models/Profile";
import { PencilIcon } from "../icons";
import { tw } from "../utilities/tw";
import { validateRequest } from "../utilities/validateRequest";

interface Inputs {
  picture: boolean;
  name: boolean;
  email: boolean;
  password: boolean;
}

export function Settings() {
  const { uiCtx, authCtx } = useAppContext();
  const { profile, token } = authCtx;
  const [inputs, setInputs] = useState<Inputs>({
    picture: false,
    name: false,
    email: false,
    password: false,
  });
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const pictureRef = useRef<HTMLInputElement>(null);

  function updateImage(e: React.ChangeEvent<HTMLInputElement>) {
    let imageSrc = "";
    if (e.currentTarget.files) {
      const pattern = "image/";
      const file = e.currentTarget.files[0];

      if (file.type.includes(pattern) && file.size < 20 * 1024 * 1024) {
        imageSrc = URL.createObjectURL(e.currentTarget.files[0]);
        setPictureFile(e.currentTarget.files[0]);
        setPicture(imageSrc);
      } else {
        alert("File must be image and smaller than 20Mb");
        if (pictureRef.current) {
          pictureRef.current.value = "";
        }
        setPicture("");
        setPictureFile(null);
      }
    }
  }

  function validateChanges() {
    let errs = [];
    if (password !== confirmPassword) {
      errs.push("Passwords don't match");
    }
    if (email?.length === 0 || (inputs.password && password?.length === 0)) {
      errs.push("Fill all fields");
    }

    if (errs.length > 0) {
      let message = "";
      errs.forEach((e) => (message += e + ";"));
      uiCtx.changeMessage(message);
      uiCtx.changeConfirmationModal(false);
      uiCtx.toggleModal();
      return false;
    }

    return true;
  }

  async function handleSubmit() {
    if (profile && token) {
      try {
        const formData = new FormData();

        if (name) {
          formData.append("name", name);
        }
        if (pictureFile) {
          formData.append("picture", pictureFile);
        }
        if (email) {
          formData.append("email", email);
        }
        if (password) {
          formData.append("password", password);
        }

        const profileRes = await axios.put(
          `/user/${profile.id}`,
          formData,
          validateRequest(token)
        );

        const updatedProfile = profileRes.data;

        const prof = new Profile(
          updatedProfile.id,
          updatedProfile.name,
          updatedProfile.email,
          updatedProfile.picture
        );

        authCtx.updateProfile(prof);
        localStorage.setItem("profile", JSON.stringify(prof));

        if (password && confirmPassword) {
          await axios.put(
            `/user/${profile.id}/password`,
            { password },
            validateRequest(token)
          );
          setPassword("");
          setConfirmPassword("");
        }

        setInputs({
          email: false,
          name: false,
          password: false,
          picture: false,
        });

        uiCtx.changeMessage("Profile updated");
        uiCtx.changeModalAction(() => navigate("/"));
        uiCtx.changeConfirmationModal(false);
        uiCtx.toggleModal();
      } catch (e) {
        window.alert(e);
      }
    }
  }

  useEffect(() => {
    if (profile) {
      setName(profile.name as string);
      setEmail(profile.email as string);
    }
  }, [profile]);

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
                    picture
                      ? picture
                      : profile
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
                <input
                  onChange={updateImage}
                  ref={pictureRef}
                  id="picture"
                  type="file"
                  hidden
                />
                <label htmlFor="picture" className={tw("cursor-pointer")}>
                  <PencilIcon width={16} height={16} color="white" />
                </label>
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
                      type="password"
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
                      type="password"
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
                  if (validateChanges()) {
                    uiCtx.changeMessage("Save changes to profile?");
                    uiCtx.toggleModal();
                    uiCtx.changeConfirmationModal(true);
                    uiCtx.changeModalAction(handleSubmit);
                  }
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
