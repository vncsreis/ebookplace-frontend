import { tw } from "../../utilities/tw";

interface ContentLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function ContentLayout(props: ContentLayoutProps) {
  return (
    <div
      className={tw(
        "dark:text-gray-200",
        "w-9/12",
        "mx-auto",
        "h-full",
        "pt-5",
        "pb-3",
        "relative",
        `${props.className}`
      )}
    >
      {props.children}
    </div>
  );
}
