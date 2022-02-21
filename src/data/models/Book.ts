export class Book {
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

  owner: string;

  constructor(
    id: string,
    title: string,
    author: string,
    year: string,
    image: string,
    epub: string,
    genre: string,
    synopsis: string,
    favourite: boolean,
    addedAt: Date,
    lastRead: Date,
    owner: string
  ) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.image = image;
    this.epub = epub;
    this.author = author;
    this.genre = genre;
    this.synopsis = synopsis;
    this.favourite = favourite;
    this.addedAt = addedAt;
    this.lastRead = lastRead;
    this.owner = owner;
  }
}
