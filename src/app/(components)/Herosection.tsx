/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react"; // Import useState
import Image from "next/image";
import Header from "./Header";
import { Imdb, Tomatoe, Watch } from "../../../assests/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const Herosection = ({ movie, loading }: { movie: any; loading: boolean }) => {
  const imagePath = "https://image.tmdb.org/t/p/original";

  const [currentSlide, setCurrentSlide] = useState<number>(0); 

  return (
    <div
      className={`w-[100vw] overflow-x-hidden h-[600px] bg-cover bg-no-repeat relative`} 
      style={{
        backgroundImage: `url(${
          imagePath + movie?.results[currentSlide]?.poster_path
        })`, 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div
        className='absolute h-fit top-0 left-0 w-full h-full bg-black opacity-50'
        style={{ zIndex: 1 }}
      ></div>

      <Header />
      <div className=' flex items-center  justify-between'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          slidesPerView={1}
          autoplay={true}
          onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
          onSwiper={(swiper) => console.log(swiper)}
          className="w-auto"
        >
          {movie?.results.map((movie: any) => {
            const numberToConvert = movie?.vote_average;
            const maxValue = 100;

            const percentage = numberToConvert * maxValue;
if (percentage > 100) {
  percentage = 100;
}
            return (
              <SwiperSlide key={movie.id}>
                <div
                  className='w-fit h-auto mt-[10em] transition-all ease-in-out duration-300 whitespace-nowrap px-[5em]  flex-col justify-start items-start gap-4 inline-flex'
                  style={{ zIndex: 2 }}
                >
                  <div
                    className='w-[404px] h-auto text-white text-5xl font-bold leading-[56px]'
                    style={{ width: "404px", whiteSpace: "break-spaces" }}
                  >
                    {movie?.title}
                  </div>
                  <div className='relative flex gap-5'>
                    <div className='w-auto h-[17px] top-0 justify-start items-center gap-2.5 inline-flex'>
                      <Image
                        className='w-[35px] h-[17px]'
                        src={Imdb}
                        width={500}
                        height={500}
                        alt='bg-image'
                      />
                      <div className='text-white text-xs font-normal leading-3'>
                        {percentage} / 100
                      </div>
                    </div>
                    <div className='w-auto h-[17px] top-0 justify-start items-center gap-2.5 inline-flex'>
                      <Image
                        className='w-4 h-[17px]'
                        src={Tomatoe}
                        width={500}
                        height={500}
                        alt='bg-image'
                      />
                      <div className='text-white text-xs font-normal leading-3'>
                        97%
                      </div>
                    </div>
                  </div>
                  <div
                    className='w-[302px] text-white text-sm font-medium leading-[18px] overflow-hidden'
                    style={{ width: "302px", height: "auto !important", whiteSpace: "break-spaces" }}
                  >
                    {movie?.overview}
                  </div>

                  <div className='px-4 py-1.5 bg-rose-700 rounded-md justify-start items-center gap-2 inline-flex'>
                    <Image
                      src={Watch}
                      width={50}
                      height={50}
                      alt='watch icon'
                      className='w-5 h-5 relative'
                    />
                    <div className='text-white text-sm font-bold uppercase leading-normal'>
                      Watch trailer
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

       <div className="w-9 h-[110px] relative z-10 mr-[3em]">
  <div className="w-2.5 h-[110px] left-[26px] top-0 absolute flex-col justify-start items-center gap-2.5 inline-flex">
    <div className="text-gray-400 text-xs font-bold leading-[14px]">1</div>
    <div className="text-gray-400 text-xs font-bold leading-[14px]">2</div>
    <div className="text-white text-base font-bold leading-[14px]">3</div>
    <div className="text-gray-400 text-xs font-bold leading-[14px]">4</div>
    <div className="text-gray-400 text-xs font-bold leading-[14px]">5</div>
  </div>
  <div className="w-5 h-[3px] left-0 top-[53px] absolute bg-white rounded-md" />
</div>
      </div>
    </div>
  );
};

export default Herosection;
