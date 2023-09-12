"use client";

import { useContext } from "react";
import { SearchContext } from "../(providers)/search-provider";
import Image from "next/image";
import { Imdb, Tomatoe, Like, Next } from "../../../assests/icons";
import { tvGenres, movieGenres } from "../../../data/genre";
import LoadingSpiner from "./Loading";

type Props = {
  movie: any;
  loading: boolean;
  movieRef: any;
};

const Card = ({
  movie,
  imagePath,
  getGenreNames,
}: {
  movie: any;
  imagePath: string;
  getGenreNames: any;
}) => {
  return (
    <>
      <div className='w-[250px] h-[370px] relative'>
        <div className='w-[250px] h-[370px] left-0 top-0 absolute'>
          <div className='w-[250px] h-[370px] left-0 top-0 absolute bg-stone-300' />
          <Image
            className='w-[250px] h-[370px] bg-gray-600 transition ease-in-out hover:brightness-50 left-0 top-0 absolute'
            src={imagePath + movie?.poster_path}
            alt={movie?.title || "title"}
            blurDataURL={imagePath + movie?.poster_path}
            width={500}
            height={500}
            placeholder='blur'
            loading='lazy'
          />
        </div>
        <div className='w-[218px]  h-[29.21px] left-[16px] top-[15.58px] absolute justify-center items-center gap-[114px] inline-flex'>
          <div className='self-stretch z-10 px-2 py-[3px] bg-gray-100 bg-opacity-50 rounded-full backdrop-blur-[2px] justify-center items-center gap-2.5 flex'>
            <div className='text-gray-900 text-xs font-bold'>
              {movie?.media_type ? movie?.media_type?.toUpperCase() : ""}
            </div>
          </div>
          <div className='w-[30px] z-10 h-[29.21px] relative'>
            <div className='w-[30px] h-[29.21px] left-0 top-0 absolute bg-gray-100 bg-opacity-50 rounded-full backdrop-blur-[2px]' />
            <Image
              src={Like}
              alt='like'
              className='w-5 h-[19.47px] left-[5px] top-[4.87px] absolute'
            />
          </div>
        </div>
      </div>
      <div className='text-gray-400 text-xs flex gap-1 font-bold'>
        <span>{movie?.origin_country ? `${movie?.origin_country},` : ""}</span>
        <span data-testid='movie-release-date'>
          {movie?.release_date?.substring(0, 4)
            ? movie?.release_date?.substring(0, 4)
            : `${movie?.first_air_date?.substring(0, 4)} - Current`}
        </span>
      </div>
      <div
        data-testid='movie-title'
        className='w-[250px] text-gray-900 text-lg font-bold'
      >
        {movie?.title ? movie?.title : movie?.original_name}
      </div>
      <div className='w-[250px] justify-between items-start gap-8 inline-flex'>
        <div className='justify-start items-center gap-2.5 flex'>
          <Image className='w-[35px] h-[17px]' src={Imdb} alt='imdb' />
          <div className='text-gray-900 text-xs font-normal leading-3'>
            {movie?.vote_average.toFixed(1)} / 10
          </div>
        </div>
        <div className='justify-start items-center gap-2.5 flex'>
          <Image className='w-4 h-[17px]' src={Tomatoe} alt='tomatoe' />
          <div className='text-gray-900 text-xs font-normal leading-3'>97%</div>
        </div>
      </div>
      <div className='text-gray-400 text-xs font-bold'>
        {getGenreNames(
          movie.genre_ids,
          movie.media_type === "tv" ? tvGenres : movieGenres
        )}
      </div>
    </>
  );
};

function MovieCard({ movie, loading, movieRef }: Props) {
  const imagePath = "https://image.tmdb.org/t/p/original";
  // @ts-ignore
  const { results, query } = useContext(SearchContext);

  function getGenreNames(genreIds: any, genresData: any) {
    const genreNames = genreIds.map((genreId: number) => {
      const genre = genresData.find((item: any) => item.id === genreId);
      return genre ? genre.name : "";
    });
    return genreNames.join(", ");
  }

  return (
    <div
      ref={movieRef}
      className='flex flex-col items-center justify-center mt-[4em]'
    >
      <div className='w-[100vw] px-[4em] py-[2em] h-[47px] justify-between items-center gap-[83px] inline-flex flex-nowrap'>
        <div
          className='text-black text-4xl font-bold'
          style={{ whiteSpace: "break-spaces" }}
        >
          {query ? `Results for " ${query} "` : "Featured Movie"}
        </div>
        <div className='justify-start items-center w-auto cursor-pointer gap-2 flex flex-nowrap'>
          <div className='text-rose-700 hover:text-rose-600 text-lg font-normal leading-normal'>
            See more
          </div>
          <Image src={Next} alt='next' className='w-5 h-5 relative' />
        </div>
      </div>
      {loading ? (
        <LoadingSpiner text='Movies' />
      ) : (
        <div className='w-[100vw] px-[4em] py-[2em] h-auto grid grid-cols-fluid gap-12 mb-[1em] '>
          {results.length > 0
            ? results.map((movie: any) => (
                <div
                  key={movie.id}
                  className='flex-col cursor-pointer  justify-start items-start gap-3 mb-[2em] inline-flex flex-wrap'
                >
                  <Card
                    movie={movie}
                    imagePath={imagePath}
                    getGenreNames={getGenreNames}
                  />
                </div>
              ))
            : movie?.results.slice(0, 10).map((movie: any) => (
                <div
                  key={movie.id}
                  className='flex-col cursor-pointer justify-start items-start gap-3 mb-[2em] inline-flex flex-wrap'
                >
                  <Card
                    movie={movie}
                    imagePath={imagePath}
                    getGenreNames={getGenreNames}
                  />
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default MovieCard;
