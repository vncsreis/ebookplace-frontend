import { Book as BookModel } from "../data/models/Book";

export interface BookResponseData {
  id: string;
  title: string;
  author: string;
  year: string;
  image: string;
  epub: string;
  genre: string;
  synopsis: string;
  favourite: boolean;
  addedAt: Date;
  lastRead: Date;
  userId: string;
  genreId: string;
}

export function generateBook(res: BookResponseData) {
  const newBook = new BookModel(
    res.id,
    res.title,
    res.author,
    res.year,
    res.image,
    res.epub,
    res.genre,
    res.synopsis,
    res.favourite,
    res.addedAt,
    res.lastRead,
    res.userId
  );

  return newBook;
}
