import { Outlet } from "react-router-dom";
import { Modal } from "../components/interface/Modal";
import { Header } from "../components/interface/Header";
import { useAppContext } from "../data/hooks/useAppContext";

export function PageLayout() {
  const { uiCtx } = useAppContext();

  function renderModal() {
    if (uiCtx.isModalOpen) {
      return <Modal text={uiCtx.message} confirmation />;
    } else {
      return <span />;
    }
  }

  return (
    <>
      {renderModal()}
      <Header />
      <Outlet />
    </>
  );
}
