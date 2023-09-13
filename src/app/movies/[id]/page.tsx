import Sidenav from "@/app/(components)/Sidenav";
import axios from "axios";

type Props = {
  params: string;
};

async function page({ params }: Props) {
  const { id }: any = params;
  let movieId = id === "%5Bmovies%5D" ? 447277 : id;

  const imagePath = "https://image.tmdb.org/t/p/original";

  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  return (
    <div className='grid'>
      <Sidenav id={id}/>
      <main></main>
    </div>
  );
}

export default page;
