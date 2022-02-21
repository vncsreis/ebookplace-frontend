import { useEffect, useState } from "react";
import { BookCard } from "../../components/interface/BookCard";
import { BooksGrid } from "../../components/layouts/BooksGrid";
import { ContentLayout } from "../../components/layouts/ContentLayout";
import { PageLayout } from "../../components/layouts/PageLayout";
import { SideMenuLayout } from "../../components/layouts/SideMenuLayout";
import { tw } from "../../utilities/tw";
import { Book as BookModel } from "../../data/models/Book";

import { BookSideMenuItems } from "../../components/content/BookSideMenuItems";
import { useAppContext } from "../../data/hooks/useAppContext";
import { Link } from "react-router-dom";

import axios from "../../config/axios";
import { validateRequest } from "../../utilities/validateRequest";
import { generateBook } from "../../utilities/generateBook";

export function Favourites() {
  const { authCtx } = useAppContext();
  const { token, profile } = authCtx;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favouriteBooks, setFavouriteBooks] = useState<BookModel[]>([]);
  const toggleOpenMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  async function toggleFavouriteFromBookCard(bookId: string) {
    try {
      const res = await axios.get(
        `/book/${bookId}/favourite`,
        validateRequest(token)
      );
      const newBook = generateBook(res.data);

      const newBookArray = favouriteBooks.map((b) => {
        if (b.id === newBook.id) {
          return newBook;
        } else {
          return b;
        }
      });

      setFavouriteBooks(newBookArray);
    } catch (e) {
      console.log(e);
    }
  }

  function renderBooks(books: BookModel[]) {
    if (books.length > 0) {
      return books.map((b) => (
        <BookCard
          book={b}
          key={b.id}
          handleToggleFavourite={() => toggleFavouriteFromBookCard(b.id)}
        />
      ));
    } else {
      return (
        <div>
          <h1 className={tw("text-2xl italic")}>
            Looks like you don't have any favourites yet
          </h1>
          <h2
            className={tw("text-xl", "mt-4", "text-indigo-500 font-semibold")}
          >
            <Link to="/mybooks">Add some!</Link>
          </h2>
        </div>
      );
    }
  }

  useEffect(() => {
    async function getUserFavouriteBooks(userId: string) {
      const res = await axios.get(
        `/book/user/${userId}/favourite`,
        validateRequest(token)
      );

      const books = res.data.map((val: any) => generateBook(val));

      if (books) {
        setFavouriteBooks(books);
      }
    }
    if (token && profile) {
      try {
        getUserFavouriteBooks(profile.id);
      } catch (e) {
        console.log(e);
      }
    }
  }, [token, profile]);

  return (
    <PageLayout>
      <SideMenuLayout isMenuOpen={isMenuOpen} setIsMenuOpen={toggleOpenMenu}>
        <BookSideMenuItems />
      </SideMenuLayout>
      <ContentLayout>
        <h1 className={tw("text-3xl", "pb-6")}>Favourites</h1>
        <BooksGrid>{renderBooks(favouriteBooks)}</BooksGrid>
      </ContentLayout>
    </PageLayout>
  );
}
