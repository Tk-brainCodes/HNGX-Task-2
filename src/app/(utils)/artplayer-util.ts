// artplayerManager.ts
import { Option } from "artplayer/types/option";
import Artplayer from "artplayer";

let artplayerInstance: Artplayer | null = null;

export const initializeArtplayer = (
  container: HTMLDivElement,
  videoKey: string,
  image: string
) => {
  if (!artplayerInstance) {
    const option: Option = {
      container,
      url: `https://www.youtube.com/watch?v=${videoKey}`,
      layers: [
        {
          name: "potser",
          html: `<img style="width: fit" src="${image}">`,
          tooltip: "Potser Tip",
          style: {
            width: "78vw",
            height: "449px",
            borderRadius: "20px",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          },
        },
      ],
      moreVideoAttr: {
        crossOrigin: "anonymous",
        preload: "none",
        playsInline: true,
      },
    };
    option.volume = 0.5;
    artplayerInstance = new Artplayer(option);
  }
};

export const showArtplayer = () => {
  if (artplayerInstance) {
    //@ts-ignore
    artplayerInstance.show();
  }
};

export const hideArtplayer = () => {
  if (artplayerInstance) {
    //@ts-ignore
    artplayerInstance.hide();
  }
};
