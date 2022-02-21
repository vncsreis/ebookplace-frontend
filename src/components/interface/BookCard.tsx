import { Link, useNavigate } from "react-router-dom";

import { tw } from "../../utilities/tw";
import { Book as BookModel } from "../../data/models/Book";
import { FilledHeartIcon, OutlinedHeartIcon } from "../../icons";

interface BookCardProps {
  book: BookModel;
  handleToggleFavourite: () => void;
}

export function BookCard({ book, handleToggleFavourite }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <Link to={`/book/${book.id}`}>
      <div
        className={tw(
          "group",
          "h-[320px] w-[240px]",
          "transition-transform",
          "overflow-hidden",
          "relative",
          "cursor-pointer",
          "fade-first-child"
        )}
      >
        <div
          className="absolute top-0 right-0 pb-2 pl-2 z-50"
          onClick={(e) => {
            e.preventDefault();
            handleToggleFavourite();
            console.log("toggle favourite on backend");
          }}
        >
          {book.favourite ? (
            <FilledHeartIcon height={10} width={10} color={"#cf1f3f"} />
          ) : (
            <OutlinedHeartIcon height={10} width={10} color={"#bdbdbd"} />
          )}
        </div>
        <div className={tw("h-full", "flex flex-col justify-center")}>
          <img
            src={
              book?.image ? `http://127.0.0.1:3030/static/${book.image}` : "/"
            }
            alt={book.title}
            className={tw("object-contain", "h-full w-full")}
          />
        </div>
        <div
          className={tw(
            "h-full w-full",
            "absolute bottom-0",
            "z-40",
            "flex flex-col justify-end",
            "translate-y-full",
            "group-hover:translate-y-0",
            "transition-all"
          )}
        >
          <div
            className={tw(
              "flex flex-col justify-center items-center",
              "h-[50%]",
              "bg-gray-800 bg-opacity-90",
              "text-white"
            )}
          >
            <h1
              className={tw(
                "opacity-0 group-hover:opacity-100",
                "transition-all",
                "text-2xl font-bold",
                "mb-2 mx-2"
              )}
            >
              {book.title}
            </h1>
            <h2
              className={tw(
                "opacity-0 group-hover:opacity-100",
                "transition-all",
                "text-sm"
              )}
            >
              {book.author}
            </h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/read/${book.id}`);
              }}
              className={tw(
                "mt-4",
                "px-3 py-1",
                "bg-indigo-600",
                "rounded-lg",
                "text-2xl",
                "text-white"
              )}
              type="button"
            >
              Read
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
