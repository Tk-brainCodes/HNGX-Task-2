import { useRef, useEffect } from "react";
import { initializeArtplayer } from "../(utils)/artplayer-util";
import { Player } from "../../../assests/icons";
import Image from "next/image";

type Props = {
  image: string;
};

function TrailerCard({ image }: Props) {
  return (
<div className='w-full px-6  h-auto'>
  <div
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
    className='w-full max-w-screen-lg md:w-[78vw] lg:w-[78vw] xl:w-[78vw] h-[449px] flex-col flex items-center justify-center mt-[3em] rounded-[20px] mb-[2em]'
  >
    <div className='w-[110px] h-[110px] cursor-pointer transition ease-in-out hover:scale-75  flex flex-col items-center justify-center bg-white bg-opacity-30 rounded-full shadow border-2 border-gray-200 border-opacity-20 backdrop-blur-sm'>
      <Image
        className='w-[54px] h-[54px] shadow'
        src={Player}
        alt='watch trailer'
      />
    </div>
    <div className='text-gray-200 mt-[30px] text-[25px] font-medium'>
      Watch Trailer
    </div>
  </div>
</div>


  );
}

export default TrailerCard;
