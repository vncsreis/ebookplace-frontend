import { HeaderMenuItem } from "./HeaderMenuItem";
import { ProfileMenu } from "./ProfileMenu";
import { SunIcon, MoonIcon, BookIcon } from "../../icons";
import { tw } from "../../utilities/tw";
import { useAppContext } from "../../data/hooks/useAppContext";
import { Link } from "react-router-dom";

export function Header() {
  const { uiCtx } = useAppContext();

  return (
    <header
      className={tw(
        "flex items-center gap-3",
        "h-20",
        "p-6",
        "dark:bg-slate-900 bg-indigo-600",
        "text-white",
        "shadow-xl"
      )}
    >
      <Link to="/">
        <div
          className={tw(
            "text-white dark:text-gray-200",
            "bold",
            "flex items-center"
          )}
        >
          <BookIcon height={16} width={16} />
          <h1 className={tw("ml-3", "font-semibold")}>Ebookplace</h1>
        </div>
      </Link>
      <ul className={tw("flex gap-3", "ml-32")}>
        <HeaderMenuItem url="/" text="Home" />
        <HeaderMenuItem url="/mybooks" text="My Books" />
        <HeaderMenuItem url="/upload" text="Upload Book" />
      </ul>
      <div className={tw("ml-auto flex items-center")}>
        <ProfileMenu className={tw("mr-6")} />
        <span
          className={tw("w-6 h-6", "mr-3", "text-gray-50 dark:text-gray-200")}
        >
          {uiCtx.isDarkMode ? <MoonIcon /> : <SunIcon />}
        </span>
        <input
          id="dark-mode-check"
          type="checkbox"
          value="Dark Mode"
          onChange={uiCtx.toggleDarkMode}
          checked={uiCtx.isDarkMode}
        />
      </div>
    </header>
  );
}
