"use client";

import { useEffect } from "react";
import Sidenav from "@/app/(components)/Sidenav";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TrailerCard from "@/app/(components)/TrailerCard";
import Image from "next/image";
import { Dropdown, Stars } from "../../../../assests/icons";

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

  const ifError = details.isError;

  useEffect(() => {
    function canCacheData(fetchStatus: any) {
      return !fetchStatus.isFetching && fetchStatus.isSuccess;
    }

    if (canCacheData(details)) {
      typeof window !== "undefined"
        ? localStorage.setItem("details", JSON.stringify(details.data))
        : "";
    }
  }, [details]);

  return (
    <>
      {ifError ? (
        <div className='font-2xl items-center justify-center text-red-700'>
          An error occurred
        </div>
      ) : (
        <div className='flex flex-start items-start max-md:flex-wrap'>
          <Sidenav id={id} />
          <main className='w-fit h-auto'>
            <TrailerCard image={imagePath + details?.data?.poster_path} />

            <section className='grid w-full h-auto grid-cols-fluid gap-2 overflow-y-hidden'>
              <div className='w-full px-6  h-auto'>
                <div className=' flex flex-wrap flex-col md:flex-row '>
                  <div className='flex justify-start gap-3 flex-wrap'>
                    <span
                      data-testid='movie-title'
                      className='text-neutral-700 text-[23px] font-medium'
                    >
                      {details?.data?.title}
                    </span>
                    <span className='text-neutral-700 text-[23px] font-normal'>
                      •
                    </span>
                    <span
                      data-testid='movie-release-date'
                      className='text-neutral-700 text-[23px] font-medium'
                    >
                      {new Date(details?.data?.release_date).toUTCString()}
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
                    <span
                      data-testid='movie-runtime'
                      className='text-neutral-700 text-[23px] font-medium'
                    >
                      {details?.data?.runtime} m
                    </span>

                    <div className='flex gap-3 items-center justify-center flex-wrap'>
                      {details?.data?.genres?.map((genre: any) => (
                        <div
                          key={genre.id}
                          className='rounded-[15px] px-2 flex items-center justify-center h-[30px] w-auto border border-pink-100 top-[6px] text-red-700 text-[15px] font-medium '
                        >
                          {genre.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-center flex-nowrap gap-3'>
                    <span className='flex items-center justify-center gap-2 text-gray-200 text-[25px] font-medium'>
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

                <div
                  data-testid='movie-overview'
                  className='mt-6 md:mt-[2em] w-full md:w-[774px] text-zinc-800 text-xl font-normal'
                >
                  {details?.data?.overview}
                </div>

                <div className='w-auto h-auto mt-[1em] grid gap-4'>
                  <div className='flex gap-3'>
                    <span className='text-zinc-800 text-xl font-normal'>
                      Director :  <span className='text-rose-700 text-xl font-normal'>
                      Joseph Kosinski
                    </span>
                    </span>
                  </div>
                  <div className='flex gap-3'>
                    <span className='text-zinc-800 text-xl font-normal'>
                      Writers :  <span className='text-rose-700 text-xl font-normal'>
                      Jim Cash, Jack Epps Jr, Peter Craig
                    </span>
                    </span>
                  </div>
                  <div className='flex gap-3'>
                    <span className='text-zinc-800 text-xl font-normal'>
                      Stars :  <span className='text-rose-700 text-xl font-normal'>
                      Tom Cruise, Jennifer Connelly, Miles Teller
                    </span>
                    </span>
                  </div>

                  {/*buttons*/}
                  <div className='w-full md:w-auto mb-[10em] h-auto md:h-[55px]  md:mb-[2em] mt-4 md:mt-[2em] cursor-pointer relative'>
                    <div className='w-full md:w-[785px] h-[55px] left-0 top-0 absolute bg-white bg-opacity-80 rounded-[10px] border border-stone-300' />
                    <div className='w-full md:w-[253px] h-[55px] left-0 top-0 absolute bg-rose-700 rounded-[10px]' />
                    <div className='left-[20px] top-[13px] md:left-[20px] md:top-[13px] absolute text-white text-xl font-medium '>
                      Top rated movie #65
                    </div>
                    <div className='left-[20px] top-[70px] md:left-[277px] md:top-[13px] absolute text-zinc-800 text-xl font-medium '>
                      Awards 9 nominations
                    </div>
                    <Image
                      className='w-[30px] h-[30px] left-[277px] top-[70px] md:left-[729px] md:top-[13px] absolute'
                      alt='dropdown'
                      src={Dropdown}
                    />
                  </div>
                </div>

                <div></div>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
}
