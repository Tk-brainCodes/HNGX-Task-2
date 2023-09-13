import { useRef, useEffect } from "react";
import { initializeArtplayer } from "../(utils)/artplayer-util";

type Props = {
  movieVideo: any;
  isArtplayerVisible: boolean;
  image: string;
};

function TrailerCard({ movieVideo, isArtplayerVisible, image }: Props) {
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (artRef.current && movieVideo?.data?.results?.length > 0) {
      const videoKey = movieVideo.data.results[0]?.key;
      initializeArtplayer(artRef.current, videoKey, image);
    }
  }, []);

  useEffect(() => {
    if (artRef.current) {
      artRef.current.style.display = isArtplayerVisible ? "block" : "none";
    }
  }, [isArtplayerVisible]);

  return (
    <div>
      <div
        ref={artRef}
        className='w-[78vw] h-[449px] mt-[2em] rounded-[20px]'
      ></div>
    </div>
  );
}

export default TrailerCard;
