import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContentLayout } from "../components/layouts/ContentLayout";
import { PageLayout } from "../components/layouts/PageLayout";
import { SideMenuLayout } from "../components/layouts/SideMenuLayout";
import { Reader } from "../components/reader/Reader";
import { BackToBookPage } from "../components/interface/BackToBookPage";

import axios from "../config/axios";
import { Book as BookModel } from "../data/models/Book";
import { useAppContext } from "../data/hooks/useAppContext";
import { validateRequest } from "../utilities/validateRequest";
import { generateBook } from "../utilities/generateBook";

export function Read() {
  const [book, setBook] = useState<BookModel | null>(null);
  const params = useParams();
  const bookId = params.book;
  const navigate = useNavigate();
  const { authCtx } = useAppContext();
  const { token } = authCtx;

  useEffect(() => {
    async function getBook(bookId: string) {
      const res = await axios.get(`/book/${bookId}`, validateRequest(token));
      const book = generateBook(res.data);
      if (book) {
        setBook(book);
      }
    }
    if (bookId && token) {
      try {
        getBook(bookId);
      } catch (e) {
        navigate("/404");
      }
    }
  }, [token, bookId, navigate]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleOpenMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <PageLayout>
      <SideMenuLayout isMenuOpen={isMenuOpen} setIsMenuOpen={toggleOpenMenu}>
        <BackToBookPage book={book} />
      </SideMenuLayout>
      <ContentLayout className="first-child-relative mb-5">
        <Reader
          url={
            book?.epub ? `http://127.0.0.1:3030/static/epub/${book.epub}` : ""
          }
        />
      </ContentLayout>
    </PageLayout>
  );
}
