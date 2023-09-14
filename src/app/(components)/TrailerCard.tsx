import { useRef, useEffect } from "react";
import { initializeArtplayer } from "../(utils)/artplayer-util";
import { Play } from "../../../assests/icons";
import Image from "next/image";

type Props = {
  movieVideo: any;
  isArtplayerVisible: boolean;
  image: string;
};

function TrailerCard({ movieVideo, isArtplayerVisible, image }: Props) {
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (artRef.current && movieVideo?.data?.results?.length > 0) {
      const videoKey = movieVideo?.data?.results[0]?.key;
      initializeArtplayer(artRef.current, videoKey, image);
    }
  }, [image, movieVideo?.data?.results]);

  useEffect(() => {
    if (artRef.current) {
      artRef.current.style.display = isArtplayerVisible ? "block" : "none";
    }
  }, [isArtplayerVisible]);

  return (
    <div className='w-auto h-auto'>
      <div
        ref={artRef}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className='w-[78vw] h-[449px] mt-[3em] rounded-[20px] mb-[2em]'
      ></div>
    </div>
  );
}

export default TrailerCard;
