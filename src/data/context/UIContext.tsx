import { createContext, useEffect, useState } from "react";

interface UIContextProps {
  message: string;
  changeMessage: (newMessage: string) => void;
  isModalOpen: boolean;
  toggleModal: () => void;
  modalAction: () => void;
  changeModalAction: (newAction: (...params: unknown[]) => unknown) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const UIContext = createContext<UIContextProps>({
  message: "",
  changeMessage: (newMessage: string) => {},
  isModalOpen: false,
  toggleModal: () => {},
  modalAction: () => {},
  changeModalAction: (newAction: (...params: unknown[]) => unknown) => {},
  isDarkMode: false,
  toggleDarkMode: () => {},
});

interface UIProviderProps {
  children: any;
}

export function UIProvider(props: UIProviderProps) {
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  function changeModalAction(newAction: (...params: unknown[]) => unknown) {
    setModalAction(() => newAction);
  }

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        message,
        changeMessage: (newMessage: string) => setMessage(newMessage),
        isModalOpen,
        toggleModal,
        modalAction,
        changeModalAction,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
}
