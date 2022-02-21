import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Book as BookModel } from "../../data/models/Book";
import { tw } from "../../utilities/tw";

interface ShowcaseBookProps {
  book: BookModel | undefined;
}

export function ShowcaseBook({ book }: ShowcaseBookProps) {
  const navigate = useNavigate();

  if (book) {
    return (
      <div className={tw("w-full", "flex justify-center", "pb-24")}>
        <div
          className={tw(
            "h-[600px]",
            "w-4/5",
            "dark:bg-gray-900 bg-indigo-500",
            "rounded-lg",
            "flex",
            "text-white"
          )}
        >
          <div
            className={tw(
              "h-full w-1/3",
              "flex flex-col items-center justify-center",
              "ml-20"
            )}
          >
            <img
              className={tw("max-h-[500px] max-w-full object-contain")}
              src={
                book.image ? `http://127.0.0.1:3030/static/${book.image}` : ""
              }
              alt={book.title}
            />
          </div>
          <div
            className={tw(
              "h-full w-2/3",
              "flex flex-col items-start",
              "px-24 py-12"
            )}
          >
            <Link to={`/book/${book.id}`}>
              <h1 className={tw("text-5xl")}>{book.title}</h1>
            </Link>
            <hr className={tw("border-indigo-500", "w-full", "my-6")} />
            <p className={tw("italic", "overflow-hidden", "max-h-[47%]")}>
              {book.synopsis}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate(`/read/${book.id}`);
              }}
              className={tw(
                "mt-auto ml-auto",
                "px-8 py-3",
                "bg-indigo-600",
                "rounded-lg",
                "text-4xl",
                "text-white"
              )}
              type="button"
            >
              Read
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
