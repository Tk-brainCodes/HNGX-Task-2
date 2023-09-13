"use client";

import { useEffect } from "react";
import Sidenav from "@/app/(components)/Sidenav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  params: string;
};

export default function MovieDetails({ params }: { params: string }) {
  const { id }: any = params;
  let movieId = id === "%5Bmovies%5D" ? 447277 : id;

  const imagePath = "https://image.tmdb.org/t/p/original";

  const details = useQuery({
    queryKey: ["details"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  const movieVideo = useQuery({
    queryKey: ["video"],
    queryFn: () =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        )
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  useEffect(() => {
    if (!movieVideo.isFetching && movieVideo.isSuccess) {
      typeof window !== "undefined"
        ? localStorage.setItem("video", JSON.stringify(movieVideo.data))
        : "";
    }
  });

  return (
    <div className='grid grid-cols-2 gap-10'>
      <Sidenav id={id} />
      <main></main>
    </div>
  );
}
