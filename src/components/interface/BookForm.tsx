/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { ContentLayout } from "../layouts/ContentLayout";
import { PageLayout } from "../layouts/PageLayout";
import { tw } from "../../utilities/tw";
import axios from "../../config/axios";
import { validateRequest } from "../../utilities/validateRequest";
import { useAppContext } from "../../data/hooks/useAppContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BookResponseData } from "../../utilities/generateBook";

interface BookUpload {
  title: string;
  author: string;
  genreId: string;
  year: string;
  synopsis: string;
  userId: string;
}

interface GenreResponse {
  id: string;
  genre: string;
}

export function BookForm() {
  const { authCtx, uiCtx } = useAppContext();
  const { token, profile } = authCtx;
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [epub, setEpub] = useState<File | null>(null);
  const [genreArray, setGenreArray] = useState<GenreResponse[]>([]);
  let editMode = false;

  if (location.pathname.search("edit") !== -1) {
    editMode = true;
  }

  async function handleFormUpload(bookToUpload: BookUpload) {
    try {
      const formData = new FormData();

      Object.keys(bookToUpload).forEach((k) => {
        if (bookToUpload)
          formData.append(k, bookToUpload[k as keyof BookUpload]);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (epub) {
        formData.append("epub", epub);
      }

      if (editMode) {
        const res = await axios.put(
          `/book/${params.book}`,
          formData,
          validateRequest(token)
        );
        const uploadedBook = res.data;
        uiCtx.changeModalAction(() => navigate("/mybooks"));
        uiCtx.changeMessage(`Book ${uploadedBook.title} updated`);
        uiCtx.toggleModal();
        return;
      }
      const res = await axios.post("/book", formData, validateRequest(token));
      const uploadedBook = res.data;
      uiCtx.changeModalAction(() => navigate("/mybooks"));
      uiCtx.changeMessage(`Book ${uploadedBook.title} uploaded`);
      uiCtx.toggleModal();
    } catch (e) {
      window.alert(e);
    }
  }

  async function getGenres() {
    try {
      const res = await axios.get("/genre", validateRequest(token));
      const genres = res.data;
      setGenreArray(genres);
    } catch (e) {
      window.alert(e);
    }
  }

  function updateImage(e: React.ChangeEvent<HTMLInputElement>) {
    let imageSrc = "";
    if (e.currentTarget.files) {
      const pattern = "image/";
      const file = e.currentTarget.files[0];

      if (file.type.includes(pattern) && file.size < 20 * 1024 * 1024) {
        imageSrc = URL.createObjectURL(e.currentTarget.files[0]);
        setImageFile(e.currentTarget.files[0]);
        setImage(imageSrc);
      } else {
        alert("File must be image and smaller than 20Mb");
        if (imageRef.current) {
          imageRef.current.value = "";
        }
        setImage("");
        setImageFile(null);
      }
    }
  }

  function renderSelectOptions(genres: GenreResponse[]) {
    return genres.map((g) => {
      return (
        <option key={g.id} value={g.id}>
          {g.genre[0].toUpperCase() + g.genre.substring(1)}
        </option>
      );
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors: string[] = [];
    if (title === "") {
      errors.push("Book must have a title");
    }
    if (author === "") {
      errors.push("Book must have an author");
    }
    if (year === "") {
      errors.push("Book must have a release year");
    }
    if (synopsis === "") {
      errors.push("Book must have a synopsis");
    }
    if (genre === "") {
      errors.push("Book must have a genre");
    }
    if (!editMode && imageFile === null) {
      errors.push("Book must have a cover image");
    }
    if (!editMode && epub === null) {
      errors.push("Book must have an EPUB file");
    }

    if (errors.length === 0) {
      if (token && profile) {
        const book: BookUpload = {
          title,
          author,
          year,
          genreId: genre,
          synopsis,
          userId: profile.id,
        };
        console.log(book);
        handleFormUpload(book);
      }
    } else {
      console.error(errors);
    }
  }

  useEffect(() => {
    async function getGenreSelection() {
      await getGenres();
    }

    if (token) {
      getGenreSelection();
    }
  }, [token]);

  useEffect(() => {
    async function fetchEditBookData() {
      if (editMode && params.book) {
        const resBook = await axios.get(
          `/book/${params.book}`,
          validateRequest(token)
        );

        const book: BookResponseData = resBook.data;

        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genreId);
        setYear(book.year);
        setSynopsis(book.synopsis);
        setImage(`http://127.0.0.1:3030/static/${book.image}`);
      }
    }
    if (token && profile) {
      try {
        fetchEditBookData();
      } catch (e) {
        console.log(e);
      }
    }
  }, [token]);

  return (
    <PageLayout>
      <ContentLayout className={tw("flex flex-col items-center")}>
        <div
          className={tw(
            "h-5/6 w-full",
            "bg-indigo-500 dark:bg-gray-900",
            "rounded-lg"
          )}
        >
          <form
            onSubmit={handleSubmit}
            className={tw("flex", "p-12", "h-full w-ful")}
          >
            <div
              className={tw(
                "w-5/12",
                "flex flex-col justify-center items-center"
              )}
            >
              <label className={tw("italic")} htmlFor="cover">
                Cover
              </label>
              <div
                className={tw(
                  "h-[500px] w-[375px]",
                  "bg-gray-500",
                  "flex flex-col items-center justify-center"
                )}
              >
                {image ? (
                  <img
                    className={tw(image ? "visible" : "hidden", "w-full")}
                    src={image ? image : "#"}
                    alt="cover"
                  />
                ) : (
                  <span>No image selected</span>
                )}
              </div>
              <input
                id="cover"
                ref={imageRef}
                type="file"
                onChange={updateImage}
              />
            </div>
            <hr className={tw("h-5/6", "border-l-[1px] my-auto ")} />
            <div
              className={tw("flex flex-1 flex-col gap-2", "h-full", "px-20")}
            >
              <label className={tw("italic")} htmlFor="name">
                Name
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={tw("rounded-lg", "text-lg", "text-black", "px-2")}
                id="name"
                type="text"
              />
              <label className={tw("italic")} htmlFor="name">
                Author
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={tw("rounded-lg", "text-lg", "text-black", "px-2")}
                id="author"
                type="text"
              />
              <label className={tw("italic")} htmlFor="genre">
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className={tw("rounded-lg", "text-lg", "text-black", "px-2")}
                name="genre"
                id="genre"
              >
                <option className={tw("hidden")} value="" />
                {genreArray !== [] ? renderSelectOptions(genreArray) : null}
              </select>
              <label className={tw("italic")} htmlFor="year">
                Year
              </label>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={tw("rounded-lg", "text-lg", "text-black", "px-2")}
                id="year"
                type="number"
              />
              <label className={tw("italic")} htmlFor="synopsis">
                Sinopsys
              </label>
              <textarea
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className={tw("rounded-lg", "text-lg", "text-black", "px-2")}
                id="synopsis"
              ></textarea>
              <label className={tw("mt-auto italic")} htmlFor="label">
                File
              </label>
              <input
                type="file"
                ref={fileRef}
                onChange={(e) => {
                  if (e.currentTarget && e.currentTarget.files) {
                    const file = e.currentTarget.files[0];

                    if (
                      file.type === "application/epub+zip" &&
                      file.size < 20 * 1024 * 1024
                    ) {
                      setEpub(
                        e.currentTarget.files ? e.currentTarget.files[0] : null
                      );
                    } else {
                      window.alert("File must be EPUB and below 20Mb");
                      if (fileRef.current) {
                        fileRef.current.value = "";
                      }
                    }
                  }
                }}
              />
              <button
                className={tw(
                  "w-fit",
                  "px-4 py-2",
                  "bg-indigo-600",
                  "rounded-lg",
                  "text-2xl",
                  "text-white",
                  "mt-auto ml-auto"
                )}
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ContentLayout>
    </PageLayout>
  );
}
