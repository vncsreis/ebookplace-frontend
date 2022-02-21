import { Book } from "./models/Book";
import { Genre } from "./types/Genre";

export function genresInDB(books: Book[]) {
  const genres: string[] = [];
  //eslint-disable-next-line
  books.map((b) => {
    if (!genres.includes(b.genre)) {
      genres.push(b.genre);
    }
    genres.sort();
  });
  return genres;
}
