import { useEffect, useState, useCallback } from "react";
import { ReactReader } from "react-reader";
import axios from "axios";
import { tw } from "../../utilities/tw";
import { Link } from "react-router-dom";

interface ReaderProps {
  url: string;
}

export function Reader({ url }: ReaderProps) {
  const [error, setError] = useState<boolean>(false);
  const [location, setLocation] = useState<string | null>(null);
  const locationChanged = (epubcifi: string) => {
    setLocation(epubcifi);
  };

  function componentToRender(param: boolean) {
    if (!param) {
      return (
        <div style={{ height: "100%" }}>
          <ReactReader
            location={location as string}
            locationChanged={locationChanged}
            url={url}
          />
        </div>
      );
    } else {
      return (
        <div
          className={tw(
            "h-full w-full",
            "flex flex-col",
            "justify-center items-center"
          )}
        >
          <div className={tw("flex flex-col items-start gap-3")}>
            <h1
              className={tw(
                "text-black dark:text-white font-bold text-5xl",
                "mb-6"
              )}
            >
              Oops!
            </h1>
            <h3
              className={tw(
                "text-gray-500 dark:text-gray-100",
                "font-light text-xl",
                "mb-2"
              )}
            >
              We couldn't find the book you were looking for...
            </h3>
            <Link to="/mybooks">
              <h2
                className={tw(
                  "text-2xl bg-indigo-600 text-gray-100",
                  "rounded-lg",
                  "p-3"
                )}
              >
                Want to try another one?
              </h2>
            </Link>
          </div>
        </div>
      );
    }
  }

  const testUrl = useCallback(async (urlToTest: string) => {
    if (urlToTest) {
      try {
        // eslint-disable-next-line
        // const res = await axios.get(urlToTest);
        return true;
      } catch (err) {
        setError(true);
      }
    }
  }, []);

  useEffect(() => {
    testUrl(url);
  }, [url, testUrl]);

  return componentToRender(error);
}
