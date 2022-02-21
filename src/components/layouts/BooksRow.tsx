import { tw } from "../../utilities/tw";

interface BooksRowProps {
  children: React.ReactNode | React.ReactNode[];
}

export function BooksRow(props: BooksRowProps) {
  return (
    <div
      className={tw(
        "grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1",
        "py-10",
        "gap-y-20",
        "gap-x-20"
      )}
    >
      {props.children}
    </div>
  );
}
