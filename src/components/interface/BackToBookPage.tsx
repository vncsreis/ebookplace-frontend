import { Book as BookModel } from "../../data/models/Book";
import { tw } from "../../utilities/tw";
import { capitalize } from "../../utilities/capitalize";
import { useState } from "react";
import { ArrowLeftSmIcon, PlusSmIcon } from "../../icons/";
import { Link } from "react-router-dom";
import { SideMenuItem } from "./SideMenuItem";

interface BackToBookPageProps {
  book: BookModel | null;
}

export function BackToBookPage({ book }: BackToBookPageProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  function renderText(icon: JSX.Element, text: string) {
    return (
      <span className={tw("flex gap-2 items-center")}>
        {icon}
        {text}
      </span>
    );
  }

  if (book) {
    return (
      <div className={tw("flex flex-col")}>
        <div
          className={tw(
            "p-3",
            "text-gray-700 dark:text-gray-100 ",
            "transition-all",
            "rounded-md",
            "overflow-hidden",
            "flex-nowrap",
            "truncate",
            "flex flex-col align-center"
          )}
        >
          <div className={tw("h-72", "flex justify-center")}>
            <img
              className={tw("h-full")}
              src={
                book.image ? `http://127.0.0.1:3030/static/${book.image}` : "/"
              }
              alt={book.title}
            />
          </div>
          <h1 className={tw("text-center", "italic font-bold", "mt-2")}>
            {book.title}
          </h1>
        </div>
        <SideMenuItem
          onClick={() => setIsInfoOpen((prev) => !prev)}
          text={renderText(<PlusSmIcon />, "Info")}
        />
        <div
          className={tw(
            isInfoOpen ? "h-20" : "h-0 overflow-hidden",
            "transition-[height]"
          )}
        >
          <ul className={tw("pl-8", "text-md", "italic", "font-light")}>
            <li>{book.author}</li>
            <li>{book.year}</li>
            <li>{capitalize(book.genre)}</li>
          </ul>
        </div>
        <Link to={`/book/${book?.id}`}>
          <SideMenuItem text={renderText(<ArrowLeftSmIcon />, "Return")} />
        </Link>
      </div>
    );
  } else return null;
}
