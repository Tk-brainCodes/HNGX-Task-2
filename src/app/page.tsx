"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "./(components)/MovieCard";
import Herosection from "./(components)/Herosection";

export default function Home() {
  const movieRef = useRef(null);

  const movies = useQuery({
    queryKey: ["movies"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    function canCacheData(fetchStatus: any) {
      return !fetchStatus.isFetching && fetchStatus.isSuccess;
    }

    if (canCacheData(movies)) {
      typeof window !== "undefined"
        ? localStorage.setItem("popular", JSON.stringify(movies.data))
        : "";
    }
  }, [movies]);

  return (
    <main className=''>
      <Herosection
        movie={movies.data}
        loading={movies.isLoading}
        movieRef={movieRef}
        isError={movies.isError}
      />
      <MovieCard
        movie={movies.data}
        loading={movies.isLoading}
        movieRef={movieRef}
        isError={movies.isError}
      />
    </main>
  );
}
