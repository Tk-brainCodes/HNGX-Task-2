"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "./(components)/MovieCard";
import Herosection from "./(components)/Herosection";
import Footer from "./(components)/Footer";

export default function Home() {
  const movieRef = useRef(null);

  const popularMovies = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  const trendingMovies = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    function canCacheData(fetchStatus: any) {
      return !fetchStatus.isFetching && fetchStatus.isSuccess;
    }

    if (canCacheData(popularMovies) && canCacheData(trendingMovies)) {
      typeof window !== "undefined"
        ? localStorage.setItem(
            "nowShowing",
            JSON.stringify(trendingMovies.data)
          )
        : "";
      typeof window !== "undefined"
        ? localStorage.setItem("popular", JSON.stringify(popularMovies.data))
        : "";
      typeof window !== "undefined"
        ? localStorage.setItem("trending", JSON.stringify(trendingMovies.data))
        : "";
    }
  }, [popularMovies, trendingMovies]);

  return (
    <main className=''>
      <Herosection
        movie={trendingMovies.data}
        loading={trendingMovies.isLoading}
        movieRef={movieRef}
        isError={trendingMovies.isError}
      />
      <MovieCard
        movie={popularMovies.data}
        loading={popularMovies.isLoading}
        movieRef={movieRef}
        isError={popularMovies.isError}
      />
      <Footer />
    </main>
  );
}
