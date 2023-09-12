"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "./(components)/MovieCard";
import Herosection from "./(components)/Herosection";

export default function Home() {
  const myKey = process.env.API_KEY;

  const popularMovies = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () =>
      axios
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${myKey}`)
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  const trendingMovies = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: () =>
      axios
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${myKey}`)
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
        movie={popularMovies.data}
        loading={popularMovies.isLoading}
      />
      <MovieCard
        movie={trendingMovies.data}
        loading={trendingMovies.isLoading}
      />
    </main>
  );
}
