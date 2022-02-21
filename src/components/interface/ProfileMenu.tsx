import { useEffect, useRef, useState } from "react";
import { tw } from "../../utilities/tw";
import { useAppContext } from "../../data/hooks/useAppContext";
import { Link, useNavigate } from "react-router-dom";

interface ProfileMenuProps {
  className?: string;
}

export function ProfileMenu(props: ProfileMenuProps) {
  const { authCtx } = useAppContext();
  const profile = authCtx.profile;
  const navigate = useNavigate();
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
      setIsInfoPanelOpen(false);
    }
  }

  function logOut() {
    authCtx.updateProfile(null);
    authCtx.updateToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    navigate("/login");
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      className={tw(
        "relative flex items-center",
        "cursor-pointer",
        props.className
      )}
      onClick={(e) => {
        e.stopPropagation();
        setIsInfoPanelOpen(!isInfoPanelOpen);
      }}
    >
      <h4 className={tw("mr-4", "font-semibold")}>{profile?.name}</h4>
      <button>
        <img
          className={tw("w-10 h-10", "rounded-full", "cursor-pointer", "mr-4")}
          src={
            profile?.picture
              ? `http://127.0.0.1:3030/static/${profile?.picture}`
              : "/"
          }
          alt={profile?.name}
        />
      </button>

      <div
        ref={panelRef}
        className={tw(
          "absolute top-12 right-0",
          "dark:bg-gray-800 bg-indigo-500",
          "text-gray-300",
          "text-xl",
          "rounded-md",
          "z-50",
          `${isInfoPanelOpen ? "fade-in" : "fade-out"}`
        )}
      >
        <ul>
          <Link to="/settings">
            <li
              className={tw(
                "py-2 px-10",
                "cursor-pointer",
                "hover:dark:bg-gray-700 hover:bg-indigo-700",
                "rounded-lg"
              )}
            >
              Settings
            </li>
          </Link>
          <hr className={tw("dark:border-gray-600", "border-indigo-300")} />
          <li
            className={tw(
              "py-2 px-10",
              "cursor-pointer",
              "hover:dark:bg-gray-700 hover:bg-indigo-700",
              "rounded-lg"
            )}
            onClick={logOut}
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
