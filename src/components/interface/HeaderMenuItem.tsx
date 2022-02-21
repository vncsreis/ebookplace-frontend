import { Link } from "react-router-dom";
import { tw } from "../../utilities/tw";

interface HeaderMenuItemProps {
  text: string;
  url: string;
}

export function HeaderMenuItem({ url, text }: HeaderMenuItemProps) {
  return (
    <li>
      <Link
        to={url}
        className={tw(
          "rounded-md",
          "p-2",
          "bg-slate-50 dark:bg-slate-600",
          "text-black dark:text-white",
          "hover:text-white",
          "hover:bg-indigo-500 dark:hover:bg-indigo-500",
          "transition-colors"
        )}
      >
        {text}
      </Link>
    </li>
  );
}
