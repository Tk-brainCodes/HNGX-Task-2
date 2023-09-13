"use client";

import {
  Logo,
  Home,
  Tv,
  Upcoming,
  Movies,
  Logout,
} from "../../../assests/icons";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from 'next/link'

type Props = {
  id: number;
};

const Sidenav = ({ id }: Props) => {
  const pathname = usePathname();

  return (
    <aside>
      <div className='w-[226px] h-[982px] rounded-tr-[45px] rounded-br-[45px] border border-black border-opacity-30'>
       <Link href="/">
        <div className='w-auto cursor-pointer h-[50px]  left-[20px] top-[52px] fixed px-2 py-2 z-40  justify-start items-center gap-6 inline-flex'>
          <Image className='w-[50px] h-[50px]' src={Logo} alt='logo' />
          <div className='text-zinc-800 text-2xl font-bold leading-normal'>
            MovieBox
          </div>
        </div>
       </Link>

        <div className='grid grid-cols-1 gap-5 mt-[10em]'>
          <div
            className={`w-auto ${
              pathname === `/movies/Home`
                ? "bg-rose-700 opacity-10 text-rose-700"
                : "text-stone-500"
            } hover:bg-rose-700 hover:bg-opacity-10 cursor-pointer px-6 flex items-center justify-start gap-4 h-[86px]`}
          >
            <Image className='w-[25px] h-[25px]' src={Home} alt='movies' />
            <div className='h-[30px] text-xl font-semibold'>Home</div>
          </div>

          <div
            className={`w-auto ${
              pathname === `/movies/${id}`
                ? "bg-rose-100 border-r-3 border-rose-700 text-rose-700"
                : "text-stone-500"
            } hover:bg-rose-700 hover:bg-opacity-10 cursor-pointer px-6 flex items-center justify-start gap-4 h-[86px]`}
          >
            <Image className='w-[25px] h-[25px]' src={Movies} alt='movies' />
            <div className='h-[30px] text-xl font-semibold'>Movies</div>
          </div>

          <div
            className={`${
              pathname === "/movies/tv"
                ? "bg-rose-700 opacity-10 text-rose-700"
                : "text-stone-500"
            } hover:bg-rose-700 hover:bg-opacity-10 cursor-pointer px-6 flex items-center justify-start gap-4 h-[86px]`}
          >
            <Image className='w-[25px] h-[25px]' src={Tv} alt='movies' />
            <div className='h-[30px] text-stone-500 text-xl font-semibold'>
              Tv Series
            </div>
          </div>

          <div
            className={`w-auto ${
              pathname === "/movies/upcoming"
                ? "bg-rose-700 opacity-10 text-rose-700"
                : "text-stone-500"
            } hover:bg-rose-700 hover:bg-opacity-10 px-6 cursor-pointer flex items-center justify-start gap-4 h-[86px]`}
          >
            <Image className='w-[25px] h-[25px]' src={Upcoming} alt='movies' />
            <div className='text-stone-500 text-xl font-semibold'>Upcoming</div>
          </div>
        </div>

        <div className='w-[114px] h-[30px] cursor-pointer left-[42px] top-[883px] absolute'>
          <div className='w-[74px] h-[30px] left-[40px] top-0 absolute text-stone-500 text-xl font-semibold'>
            Log out
          </div>
          <Image
            className='w-[30px] h-[30px] left-0 top-0 absolute shadow'
            src={Logout}
            alt='logout'
          />
        </div>
        <div className='w-[170px] h-[228px] left-[28px] top-[611px] absolute'>
          <div className='w-[170px] h-[210px] left-0 top-[18px] absolute bg-pink-100 bg-opacity-40 rounded-[20px] border border-rose-700 border-opacity-70' />
          <div className='left-[15px] top-[138px] absolute text-stone-500 text-xs font-medium'>
            50k people are playing
            <br />
            now
          </div>
          <div className='left-[16px] top-[60px] absolute text-zinc-800 text-opacity-80 text-[15px] font-semibold'>
            Play movie quizes
            <br />
            and earn
            <br />
            free tickets
          </div>
          <div className='w-28 h-[30px] left-[29px] top-[182px] hover:bg-rose-500 absolute bg-rose-700 bg-opacity-20 rounded-[30px]' />
          <div className='left-[46px] top-[188px] absolute text-rose-700 text-xs font-medium'>
            Start playing
          </div>
          <div className='w-[35px] h-[35px] left-[67px] top-0 absolute shadow' />
        </div>
      </div>
    </aside>
  );
};

export default Sidenav;
