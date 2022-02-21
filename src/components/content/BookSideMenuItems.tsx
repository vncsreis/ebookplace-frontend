import { Link, useLocation } from "react-router-dom";
import { SideMenuItem } from "../interface/SideMenuItem";
import { GenreList } from "./GenreList";

export function BookSideMenuItems() {
  const location = useLocation();

  function renderFavouriteLink() {
    if (location.pathname.search("favourites") === -1) {
      return (
        <Link to="/mybooks/favourites">
          <SideMenuItem text="Favourites" />
        </Link>
      );
    } else {
      return (
        <Link to="/mybooks">
          <SideMenuItem text="All" />
        </Link>
      );
    }
  }

  function renderAllLink() {
    if (location.pathname.search("genre") !== -1) {
      return (
        <Link to="/mybooks">
          <SideMenuItem text="All" />
        </Link>
      );
    }
  }

  return (
    <>
      {renderAllLink()}
      {renderFavouriteLink()}
      <GenreList />
    </>
  );
}
