"use client";

import { useEffect } from "react";
import Sidenav from "@/app/(components)/Sidenav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TrailerCard from "@/app/(components)/TrailerCard";

type Props = {
  params: string;
};

export default function MovieDetails({ params }: Props) {
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
    function canCacheData(fetchStatus: any) {
      return !fetchStatus.isFetching && fetchStatus.isSuccess;
    }

    if (canCacheData(movieVideo) && canCacheData(details)) {
      typeof window !== "undefined"
        ? localStorage.setItem("video", JSON.stringify(movieVideo.data))
        : "";
      typeof window !== "undefined"
        ? localStorage.setItem("details", JSON.stringify(details.data))
        : "";
    }
  }, [movieVideo, details]);



  return (
    <div className='flex gap-5 max-md:flex-wrap'>
      <Sidenav id={id} />
      <main>
        <TrailerCard
          image={imagePath + details?.data?.poster_path}
          movieVideo={movieVideo}
          isArtplayerVisible={true}
        />
      </main>
    </div>
  );
}
