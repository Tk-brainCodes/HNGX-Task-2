import Image from "next/image";
import { Imdb, Tomatoe, Like } from "../../../assests/icons";

type Props = {
  movie: any;
  loading: boolean;
};

function MovieCard({ movie, loading }: Props) {
  const imagePath = "https://image.tmdb.org/t/p/original";

  return (
    <div className="flex flex-col items-center justify-center mt-[4em]">
      <div className='w-[100vw] px-[4em] py-[2em] h-[47px] justify-between items-center gap-[83px] inline-flex'>
        <div className='text-black text-4xl font-bold'>Featured Movie</div>
        <div className='justify-start items-center gap-2 flex'>
          <div className='text-rose-700 text-lg font-normal leading-normal'>
            See more
          </div>
          <div className='w-5 h-5 relative' />
        </div>
      </div>
      <div className='w-[100vw] px-[4em] py-[2em] h-auto grid grid-cols-fluid gap-10 '>
        {movie?.results.map((movie: any) => (
          <>
            <div className='flex-col justify-start items-start gap-3 inline-flex flex-wrap'>
              <div className='w-[250px] h-[370px] relative'>
                <div className='w-[250px] h-[370px] left-0 top-0 absolute'>
                  <div className='w-[250px] h-[370px] left-0 top-0 absolute bg-stone-300' />
                  <Image
                    className='w-[250px] h-[370px] left-0 top-0 absolute'
                    src={imagePath + movie?.poster_path}
                    alt={movie?.title || "title"}
                    blurDataURL={imagePath + movie?.poster_path}
                    priority
                    width={500}
                    height={500}
                  />
                </div>
                <div className='w-[218px] h-[29.21px] left-[16px] top-[15.58px] absolute justify-center items-center gap-[114px] inline-flex'>
                  <div className='self-stretch px-2 py-[3px] bg-gray-100 bg-opacity-50 rounded-xl backdrop-blur-[2px] justify-start items-start gap-2.5 inline-flex'>
                    <div className='text-gray-900 text-xs font-bold'>
                      {movie?.media_type.toUpperCase()}
                    </div>
                  </div>
                  <div className='w-[30px] h-[29.21px] relative'>
                    <div className='w-[30px] h-[29.21px] left-0 top-0 absolute bg-gray-100 bg-opacity-50 rounded-full backdrop-blur-[2px]' />
                    <div className='w-5 h-[19.47px] left-[5px] top-[4.87px] absolute' />
                  </div>
                </div>
              </div>
              <div className='text-gray-400 text-xs font-bold'>
                USA, 2016 - Current
              </div>
              <div className='w-[250px] text-gray-900 text-lg font-bold'>
                Stranger Things
              </div>
              <div className='w-[250px] justify-between items-start gap-8 inline-flex'>
                <div className='justify-start items-center gap-2.5 flex'>
                  <Image className='w-[35px] h-[17px]' src={Imdb} alt='imdb' />
                  <div className='text-gray-900 text-xs font-normal leading-3'>
                    86.0 / 100
                  </div>
                </div>
                <div className='justify-start items-center gap-2.5 flex'>
                  <Image className='w-4 h-[17px]' src={Tomatoe} alt='tomatoe' />
                  <div className='text-gray-900 text-xs font-normal leading-3'>
                    97%
                  </div>
                </div>
              </div>
              <div className='text-gray-400 text-xs font-bold'>
                Action, Adventure, Horror
              </div>
            </div>
          </>
        )).slice(0, 10)}
      </div>
    </div>
  );
}

export default MovieCard;
