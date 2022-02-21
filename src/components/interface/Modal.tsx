import { useEffect, useRef } from "react";
import { useAppContext } from "../../data/hooks/useAppContext";
import { tw } from "../../utilities/tw";

interface ModalProps {
  text: string;
  confirmation: boolean;
}

export function Modal({ text, confirmation }: ModalProps) {
  const { uiCtx } = useAppContext();

  const modalRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      uiCtx.toggleModal();
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={tw(
        "absolute h-screen w-full",
        "z-50",
        "dark:bg-black bg-gray-600 bg-opacity-90"
      )}
    >
      <div
        ref={modalRef}
        className={tw(
          "dark:text-white text-black",
          "dark:bg-gray-800 bg-gray-300",
          "z-50",
          "rounded-lg",
          "absolute top-1/3 right-1/3",
          "w-1/3",
          "p-10",
          "flex flex-col items-center"
        )}
      >
        <h1 className={tw("text-3xl", "mb-5")}>{text}</h1>
        {confirmation ? (
          <div className={tw("text-xl text-white", "flex gap-12", "p-6")}>
            <button
              type="button"
              className={tw("w-32 h-16", "bg-green-600", "rounded-lg")}
              onClick={() => {
                uiCtx.modalAction();
                uiCtx.toggleModal();
                uiCtx.changeMessage("");
                uiCtx.changeModalAction(() => () => {});
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className={tw("w-32 h-16", "bg-red-600", "rounded-lg")}
              onClick={() => {
                uiCtx.toggleModal();
                uiCtx.changeMessage("");
                uiCtx.changeModalAction(() => () => {});
              }}
            >
              No
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className={tw("w-32 h-16", "bg-indigo-600", "rounded-lg")}
              onClick={() => {
                uiCtx.modalAction();
                uiCtx.toggleModal();
                uiCtx.changeMessage("");
                uiCtx.changeModalAction(() => () => {});
              }}
            >
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
