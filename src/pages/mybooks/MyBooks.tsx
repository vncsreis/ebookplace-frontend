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
import axios from "../../config/axios";
import { validateRequest } from "../../utilities/validateRequest";

export function MyBooks() {
  const { authCtx } = useAppContext();
  const { profile, token } = authCtx;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userBooks, setUserBooks] = useState<BookModel[]>([]);
  const toggleOpenMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  async function toggleFavouriteFromBookCard(bookId: string) {
    try {
      const res = await axios.get(
        `/book/${bookId}/favourite`,
        validateRequest(token)
      );
      const resBook = res.data;
      const newBook = new BookModel(
        resBook.id,
        resBook.title,
        resBook.author,
        resBook.year,
        resBook.image,
        resBook.epub,
        resBook.genre,
        resBook.synopsis,
        resBook.favourite,
        resBook.addedAt,
        resBook.lastRead,
        resBook.userId
      );

      const newUserBookArray = userBooks.map((b, i) => {
        if (b.id === newBook.id) {
          return newBook;
        } else {
          return b;
        }
      });
      setUserBooks(newUserBookArray);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getUserBooks() {
      if (profile) {
        const res = await axios.get(`/book/user/${profile.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const books = res.data.map((b: any) => {
          return new BookModel(
            b.id,
            b.title,
            b.author,
            b.year,
            b.image,
            b.epub,
            b.genre,
            b.synopsis,
            b.favourite,
            b.addedAt,
            b.lastRead,
            b.userId
          );
        });
        setUserBooks(books);
      }
    }
    try {
      getUserBooks();
    } catch (e) {
      console.log(e);
    }
  }, [token, profile]);

  function renderBooks() {
    return userBooks.map((b) => (
      <BookCard
        book={b}
        key={b.id}
        handleToggleFavourite={() => toggleFavouriteFromBookCard(b.id)}
      />
    ));
  }

  return (
    <PageLayout>
      <SideMenuLayout isMenuOpen={isMenuOpen} setIsMenuOpen={toggleOpenMenu}>
        <BookSideMenuItems />
      </SideMenuLayout>
      <ContentLayout>
        <h1 className={tw("text-3xl", "pb-6")}>My Books</h1>
        <BooksGrid>{renderBooks()}</BooksGrid>
      </ContentLayout>
    </PageLayout>
  );
}
