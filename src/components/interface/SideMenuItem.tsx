import { tw } from "../../utilities/tw";

interface SideMenuItemProps {
  text: string | JSX.Element;
  onClick?: () => void;
}

export function SideMenuItem({ text, onClick }: SideMenuItemProps) {
  return (
    <li
      onClick={onClick}
      className={tw(
        "p-3",
        "text-gray-700 dark:text-gray-100 hover:text-white",
        "hover:bg-indigo-400",
        "dark:hover:bg-indigo-500",
        "hover:text-gray-50",
        "transition-all",
        "rounded-md",
        "cursor-pointer",
        "overflow-hidden",
        "flex-nowrap",
        "truncate",
        "select-none"
      )}
    >
      {text}
    </li>
  );
}
