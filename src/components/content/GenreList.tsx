import { SideMenuItem } from "../interface/SideMenuItem";
import { Link } from "react-router-dom";
import { useAppContext } from "../../data/hooks/useAppContext";
import { useEffect, useState } from "react";
import { validateRequest } from "../../utilities/validateRequest";
import axios from "../../config/axios";

interface Genre {
  genre: string;
  id: string;
}

export function GenreList() {
  const { authCtx } = useAppContext();
  const { token, profile } = authCtx;
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    async function getGenres(userId: string) {
      const res = await axios.get(
        `/genre/user/${userId}`,
        validateRequest(token)
      );

      const genreArray = res.data;

      if (genreArray) {
        setGenres(genreArray);
      }
    }

    if (token && profile) {
      try {
        getGenres(profile.id);
      } catch (e) {
        console.log(e);
      }
    }
  }, [profile, token]);

  return (
    <>
      {genres.map((g) => (
        <Link to={`/mybooks/genre/${g.id}`} key={g.id}>
          <SideMenuItem
            text={g.genre[0].toUpperCase() + g.genre.substring(1)}
          />
        </Link>
      ))}
    </>
  );
}
