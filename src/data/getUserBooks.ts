import { bookDB, filterFavourites } from "./db/books";

export function getUserBooks(user: string | undefined) {
  if (user) {
    return bookDB.filter((b) => b.owner === user);
  } else {
    return [];
  }
}

export function getUserFavouriteBooks(user: string | undefined) {
  if (user) {
    return filterFavourites(getUserBooks(user));
  } else {
    return [];
  }
}
