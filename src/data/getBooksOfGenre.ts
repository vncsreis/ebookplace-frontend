import { Book } from "./models/Book";

export function getBooksOfGenre(genre: string, books: Book[]) {
  return books.filter((b) => b.genre === genre);
}
