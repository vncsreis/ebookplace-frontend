import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookCard } from "../../../components/interface/BookCard";
import { BooksGrid } from "../../../components/layouts/BooksGrid";
import { ContentLayout } from "../../../components/layouts/ContentLayout";
import { PageLayout } from "../../../components/layouts/PageLayout";
import { SideMenuLayout } from "../../../components/layouts/SideMenuLayout";
import { tw } from "../../../utilities/tw";
import { BookSideMenuItems } from "../../../components/content/BookSideMenuItems";
import { useAppContext } from "../../../data/hooks/useAppContext";
import axios from "../../../config/axios";
import {
  generateBook,
  BookResponseData,
} from "../../../utilities/generateBook";
import { Book as BookModel } from "../../../data/models/Book";
import { validateRequest } from "../../../utilities/validateRequest";

export function BooksByGenre() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleOpenMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  const [books, setBooks] = useState<BookModel[]>([]);
  const [genre, setGenre] = useState("");
  const { authCtx } = useAppContext();
  const { profile, token } = authCtx;

  const genreId = useParams().genre as string;

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
    async function getGenreBooks(genreId: string) {
      if (profile && genreId && token) {
        const res = await axios.get(
          `/book/user/${profile.id}/genre/${genreId}`,
          validateRequest(token)
        );
        const resGenre = await axios.get(
          `/genre/${genreId}`,
          validateRequest(token)
        );

        if (resGenre) {
          setGenre(resGenre.data.genre);
        }

        const resBooks = res.data;

        const books = resBooks.map((b: BookResponseData) => generateBook(b));

        if (books) {
          setBooks(books);
        }
      }
    }

    if (profile && genreId && token) {
      try {
        getGenreBooks(genreId);
      } catch (e) {
        console.log(e);
      }
    }
  }, [genreId, profile, token]);

  function renderBooks(books: BookModel[]) {
    return books.map((b) => (
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
        <h1 className={tw("text-3xl", "pb-6")}>{genre}</h1>
        <BooksGrid>{renderBooks(books)}</BooksGrid>
      </ContentLayout>
    </PageLayout>
  );
}
