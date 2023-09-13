/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect } from "react";
import Sidenav from "@/app/(components)/Sidenav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TrailerCard from "@/app/(components)/TrailerCard";
import Image from "next/image";
import {
  Dropdown,
  Stars,
  Option,
  Tag,
  OptionW,
  ImageMovie,
} from "../../../../assests/icons";

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

        <section className='grid grid-cols-fluid gap-2 overflow-y-hidden'>
          <div className='w-[78vw] h-auto'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-4'>
                <div className='flex gap-4'>
                  <span
                    data-testid="movie-title"
                    className='text-neutral-700 text-[23px] font-medium'
                  >
                    {details?.data?.original_title}
                  </span>
                  <span className='text-neutral-700 text-[23px] font-normal'>
                    •
                  </span>
                  <span  data-testid="movie-release-date" className='text-neutral-700 text-[23px] font-medium'>
                    {details?.data?.release_date?.substring(0, 4)}
                  </span>
                  <span className='text-neutral-700 text-[23px] font-normal'>
                    •
                  </span>
                  <span className='text-neutral-700 text-[23px] font-medium'>
                    {details?.data?.adult === false ? "PG-13" : "18+"}
                  </span>
                  <span className='text-neutral-700 text-[23px] font-bold'>
                    •
                  </span>
                  <span data-testid="movie-runtime" className='text-neutral-700 text-[23px] font-medium'>
                    {details?.data?.runtime} m
                  </span>
                </div>

                {details?.data?.genres?.map((genre: any) => (
                  <div
                    key={genre.id}
                    className='rounded-[15px] flex items-center justify-center h-[30px] w-[84px] border border-pink-100 top-[6px] text-red-700 text-[15px] font-medium '
                  >
                    {genre.name}
                  </div>
                ))}
              </div>

              <div className='flex gap-3 items-center justify-center'>
                <span className='flex gap-2 text-gray-200 text-[25px] font-medium'>
                  <Image
                    src={Stars}
                    alt='starts'
                    className='w-[30px] h-[30px]'
                  />
                  {details?.data?.vote_average.toFixed(1)}
                </span>
                <span className='text-stone-500 text-xl font-medium'>
                  | 350k
                </span>
              </div>
            </div>

            <div data-testid="movie-overview" className='top-[60px] mt-[2em] w-[774px] text-zinc-800 text-xl font-normal'>
              {details?.data?.overview}
            </div>

            {/*directors*/}
            <div className='w-auto h-auto mt-[1em] grid gap-8'>
              <div className='flex gap-3'>
                <span className='text-zinc-800 text-xl font-normal'>
                  Director :
                </span>
                <span className='text-rose-700 text-xl font-normal'>
                  Joseph Kosinski
                </span>
              </div>
              <div className='flex gap-3'>
                <span className='text-zinc-800 text-xl font-normal'>
                  Writers :
                </span>
                <span className='text-rose-700 text-xl font-normal'>
                  Jim Cash, Jack Epps Jr, Peter Craig
                </span>
              </div>
              <div className='flex gap-3'>
                <span className='text-zinc-800 text-xl font-normal'>
                  Stars :
                </span>
                <span className='text-rose-700 text-xl font-normal'>
                  Tom Cruise, Jennifer Connelly, Miles Teller
                </span>
              </div>
            </div>

            {/*buttons*/}
            <div className='w-auto h-[55px] mt-[2em] cursor-pointer relative'>
              <div className='w-[785px] h-[55px] left-0 top-0 absolute bg-white bg-opacity-80 rounded-[10px] border border-stone-300' />
              <div className='w-[253px] h-[55px] left-0 top-0 absolute bg-rose-700 rounded-[10px]' />
              <div className='left-[20px] top-[13px] absolute text-white text-xl font-medium '>
                Top rated movie #65
              </div>
              <div className='left-[277px] top-[13px] absolute text-zinc-800 text-xl font-medium '>
                Awards 9 nominations
              </div>
              <Image
                className='w-[30px] h-[30px] left-[729px] top-[13px] absolute'
                alt='dropdown'
                src={Dropdown}
              />
            </div>
          </div>

          <div></div>
        </section>
      </main>
    </div>
  );
}
