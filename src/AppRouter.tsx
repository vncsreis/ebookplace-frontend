import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Read } from "./pages/Read";
import { MyBooks } from "./pages/mybooks/MyBooks";
import { Favourites } from "./pages/mybooks/Favourites";
import { BookPage } from "./pages/BookPage";
import { ErrorPage } from "./pages/404";
import { BooksByGenre } from "./pages/mybooks/genre/BooksByGenre";
import { Login } from "./pages/Login";
import { PageLayout } from "./pages/Page";
import { Settings } from "./pages/Settings";
import { UploadPage } from "./pages/UploadPage";
import { EditPage } from "./pages/EditPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="read/:book" element={<Read />} />
            <Route path="book/:book" element={<BookPage />} />
            <Route path="mybooks" element={<Outlet />}>
              <Route index element={<MyBooks />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="genre/:genre" element={<BooksByGenre />} />
            </Route>
            <Route path="settings" element={<Settings />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="edit/:book" element={<EditPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
