import { tw } from "../../utilities/tw";
import { BooksRow } from "../layouts/BooksRow";

interface BookSectionProps {
  children: JSX.Element | JSX.Element[];
  title: string;
  button?: boolean;
  buttonText?: string;
  buttonFunction?: () => void;
}

export function BookSection(props: BookSectionProps) {
  return (
    <section
      className={tw(
        "w-full mb-20",
        "bg-indigo-500 dark:bg-slate-800",
        "text-white",
        "p-6",
        "rounded-lg"
      )}
    >
      <div className={tw("flex justify-between")}>
        <h1 className={tw("text-3xl font-bold")}>{props.title}</h1>
        {props.button ? (
          <button
            className={tw(
              "mt-auto ml-auto",
              "px-4 py-2",
              "bg-indigo-600",
              "rounded-lg",
              "text-md",
              "text-white"
            )}
            onClick={props.buttonFunction}
          >
            {props.buttonText}
          </button>
        ) : null}
      </div>
      <div className={tw("w-full h-full", "flex flex-col", "items-center")}>
        <BooksRow>{props.children}</BooksRow>
      </div>
    </section>
  );
}
