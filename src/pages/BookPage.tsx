import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { PageLayout } from "../components/layouts/PageLayout";
import { ContentLayout } from "../components/layouts/ContentLayout";
import {
  FilledHeartIcon,
  OutlinedHeartIcon,
  PencilIconOutlined,
  TrashIcon,
} from "../icons";

import { tw } from "../utilities/tw";
import { Book as BookModel } from "../data/models/Book";
import { useAppContext } from "../data/hooks/useAppContext";
import axios from "../config/axios";
import { generateBook } from "../utilities/generateBook";
import { validateRequest } from "../utilities/validateRequest";

export function BookPage() {
  const { authCtx } = useAppContext();
  const { token } = authCtx;
  const navigate = useNavigate();
  const [chosenBook, setChosenBook] = useState<BookModel | null>(null);
  const params = useParams();

  async function handleDeleteBook(bookId: string) {
    try {
      await axios.delete(`/book/${bookId}`, validateRequest(token));
      navigate("/mybooks");
    } catch (e) {
      console.log(e);
    }
  }

  async function handleToggleFavourite(bookId: string) {
    try {
      const res = await axios.get(
        `/book/${bookId}/favourite`,
        validateRequest(token)
      );
      const newBook = generateBook(res.data);

      if (newBook) {
        setChosenBook(newBook);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await axios.get(`/book/${params.book}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const resBook = res.data;
        const newBook = generateBook(resBook);
        if (newBook) {
          setChosenBook(newBook);
        } else {
          navigate("/404");
        }
      } catch (e) {
        navigate("/404");
      }
    }
    if (params.book && token) {
      loadBook();
    }
  }, [navigate, params.book, token]);

  const { uiCtx } = useAppContext();

  return (
    <PageLayout>
      <ContentLayout>
        <div
          className={tw(
            "flex h-[90%]",
            "p-10",
            "dark:bg-gray-900 bg-gray-200",
            "rounded-lg"
          )}
        >
          <div
            className={tw(
              "w-1/3 max-h-full",
              "flex flex-col justify-center items-center"
            )}
          >
            <img
              src={
                chosenBook?.image
                  ? `http://127.0.0.1:3030/static/${chosenBook?.image}`
                  : "/"
              }
              alt={chosenBook?.title}
              className={tw("w-full")}
            />
          </div>
          <div
            className={tw(
              "w-7/12 h-auto",
              "box-border",
              "ml-auto",
              "flex flex-col gap-5",
              "relative"
            )}
          >
            <h1 className={tw("text-6xl font-bold")}>{chosenBook?.title}</h1>
            <hr className={tw("border-gray-700 dark:border-gray-300")} />
            <h2 className={tw("text-4xl")}>{chosenBook?.author}</h2>
            <h4
              className={tw(
                "italic font-light text-2xl",
                "dark:text-gray-300 text-gray-700"
              )}
            >
              {chosenBook?.year}
            </h4>
            <h6
              className={tw(
                "italic font-light text-2xl",
                "dark:text-gray-300 text-gray-700"
              )}
            >
              {`${
                ((chosenBook?.genre[0].toUpperCase() as string) +
                  chosenBook?.genre.substring(1)) as string
              }`}
            </h6>
            <hr
              className={tw("w-1/4 h-0.5 dark:border-gray-700 border-gray-400")}
            />
            <div>
              <p className={tw("text-md font-thin mb-1 italic")}>Synopsis:</p>
              <p>{chosenBook?.synopsis}</p>
            </div>
            <div className={tw("flex gap-6 items-center", "mt-auto ml-auto")}>
              <div
                className={tw(
                  "hover:text-indigo-500 transition-colors",
                  "cursor-pointer"
                )}
                onClick={() => {
                  if (chosenBook) {
                    navigate(`/edit/${chosenBook.id}`);
                  }
                }}
              >
                <PencilIconOutlined height={10} width={10} />
              </div>

              <div
                className={tw(
                  "hover:text-indigo-500 transition-colors",
                  "cursor-pointer"
                )}
                onClick={() => {
                  if (chosenBook) {
                    uiCtx.toggleModal();
                    uiCtx.changeMessage(
                      `Delete "${chosenBook?.title}"? This action cannot be undone.`
                    );
                    uiCtx.changeConfirmationModal(true);
                    uiCtx.changeModalAction(() =>
                      handleDeleteBook(chosenBook.id)
                    );
                  } else {
                    console.log("Failed to set modal");
                  }
                }}
              >
                <TrashIcon height={10} width={10} />
              </div>
              <div
                className={tw("cursor-pointer")}
                onClick={async (e) => {
                  e.preventDefault();
                  if (chosenBook) {
                    handleToggleFavourite(chosenBook.id);
                  }
                }}
              >
                {chosenBook?.favourite ? (
                  <FilledHeartIcon height={10} width={10} color={"#cf1f3f"} />
                ) : (
                  <OutlinedHeartIcon height={10} width={10} />
                )}
              </div>

              <Link to={`/read/${chosenBook?.id}`}>
                <button
                  className={tw(
                    "mr-10",
                    "px-6 py-3",
                    "bg-indigo-600 hover:bg-indigo-800",
                    "transition-colors",
                    "rounded-lg",
                    "text-3xl",
                    "text-white"
                  )}
                  type="button"
                >
                  Read
                </button>
              </Link>
            </div>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
}
