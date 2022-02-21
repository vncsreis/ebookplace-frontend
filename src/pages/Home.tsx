import axios from "../config/axios";
import { PageLayout } from "../components/layouts/PageLayout";
import { ContentLayout } from "../components/layouts/ContentLayout";
import { tw } from "../utilities/tw";
import { BookCard } from "../components/interface/BookCard";
import { BookSection } from "../components/content/BookSection";
import { Book as BookModel } from "../data/models/Book";
import { useAppContext } from "../data/hooks/useAppContext";
import { ShowcaseBook } from "../components/content/ShowcaseBook";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validateRequest } from "../utilities/validateRequest";
import { generateBook } from "../utilities/generateBook";

export function Home() {
  const { authCtx } = useAppContext();
  const { token, profile } = authCtx;
  const [showcasedBook, setShowcasedBook] = useState<BookModel>();
  const [books, setBooks] = useState<BookModel[]>([]);

  const lastAddedArray = books
    .sort((a, b) => (a.addedAt > b.addedAt ? -1 : 1))
    .filter((_, i) => i < 4);

  async function toggleFavouriteFromBookCard(bookId: string) {
    try {
      const res = await axios.get(
        `/book/${bookId}/favourite`,
        validateRequest(token)
      );
      const newBook = generateBook(res.data);

      const newBookArray = books.map((b) => {
        if (b.id === newBook.id) {
          return newBook;
        } else {
          return b;
        }
      });

      setBooks(newBookArray);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getBooks() {
      try {
        const res = await axios.get(
          `book/user/${profile?.id}`,
          validateRequest(token)
        );
        const bookResponse = res.data as BookModel[];
        setBooks(bookResponse);
      } catch (e) {
        console.log(e);
      }
    }
    if (profile) {
      getBooks();
    }
  }, [profile, token]);

  useEffect(() => {
    if (books) {
      const randInt = Math.floor(Math.random() * books.length);
      setShowcasedBook(books[randInt]);
    }
  }, [books]);

  return (
    <PageLayout className="flex-col">
      <ContentLayout>
        <div>
          <h1 className={tw("text-3xl italic", "pb-4")}>Read Next:</h1>
          <ShowcaseBook book={showcasedBook} />
        </div>
        <BookSection title="Last Additions">
          {lastAddedArray.map((b) => (
            <BookCard
              book={b}
              key={b.id}
              handleToggleFavourite={() => toggleFavouriteFromBookCard(b.id)}
            />
          ))}
        </BookSection>
      </ContentLayout>
      <footer
        className={tw(
          "w-full h-44",
          "bg-indigo-600 dark:bg-gray-900",
          "text-white",
          "px-28 py-6",
          "flex"
        )}
      >
        <div
          className={tw(
            "flex-1 flex flex-col items-end justify-center",
            "pr-6"
          )}
        >
          <Link className={tw("text-lg")} to="/about">
            About
          </Link>
        </div>
        <hr className={tw("h-full border-l-[1px]")} />
        <div
          className={tw(
            "flex-1 flex flex-col items-start justify-center",
            "gap-6",
            "pl-6"
          )}
        >
          <h6>Made by Vinícius dos Reis</h6>
          <a href="http://github.com/vncsreis" rel="noreferrer" target="_blank">
            github.com/vncsreis
          </a>
        </div>
      </footer>
    </PageLayout>
  );
}
