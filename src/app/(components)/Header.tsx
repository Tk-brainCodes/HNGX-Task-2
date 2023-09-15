import React, { useState, useEffect, useContext } from "react";
import { Logo, Hamburger, Search } from "../../../assests/icons";
import { Link as LinkTo, animateScroll as scroll } from "react-scroll";
import { SearchContext } from "../(providers)/search-provider";
import Image from "next/image";

type Props = {
  movieRef: any;
};

function Header({ movieRef }: Props) {
  // @ts-ignore
  const { query, onChange } = useContext(SearchContext);
  const [scrolling, setScrolling] = useState(false);


  //scroll to destination
  const handleScroll = () => {
    setScrolling(window.scrollY > 0);
  };

  //add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //scroll to movies onClick
  const scrollToMovies = () => {
    scroll.scrollTo(movieRef.current.offsetTop, {
      duration: 800,
      smooth: "easeInOutQuart",
      offset: -50,
    });
  };

  return (
    <div
      className={`block  max-md:flex-col max-md:flex max-md:items-center max-md:justify-center fixed z-40 ${
        scrolling
          ? "firefox:bg-opacity-90 transiton ease-out bg-opacity-30 backdrop-filter backdrop-blur-lg bg-[#121212]"
          : ""
      } `}
    >
      <div
        className={`w-[100vw]  py-[1em] px-[4em] flex items-center justify-between h-auto`}
      >
        <LinkTo
          to='hero'
          offset={-110}
          spy={true}
          smooth={true}
          duration={500}
          activeClass='active'
        >
          <div className='w-[186px] cursor-pointer h-[50px] justify-start items-center gap-6 inline-flex'>
            <Image
              src={Logo}
              alt='logo'
              width={50}
              height={50}
              className='w-[50px] h-[50px]'
            />
            <div className='text-white text-2xl font-bold leading-normal'>
              MovieBox
            </div>
          </div>
        </LinkTo>
        <div className='w-[525px]'>
          <div className='w-full max-md:hidden max-sm:hidden h-9 px-2.5 py-1.5 rounded-md border border-gray-300 justify-between items-center gap-2.5 inline-flex'>
            <input
              type='text'
              value={query}
              onChange={onChange}
              placeholder='What do you want to watch?'
              className='text-white text-base font-normal leading-normal bg-transparent border-none outline-none w-full'
              onClick={scrollToMovies}
            />
            <button
              onClick={onChange}
              className='text-white bg-transparent border-none outline-none cursor-pointer'
            >
              <Image
                src={Search}
                alt='search-icon'
                className='w-4 h-4 relative'
              />
            </button>
          </div>
        </div>
        <div className=' flex h-9 justify-between items-center gap-[27px]'>
          <div className='text-white block max-sm:hidden max-md:hidden text-base font-bold leading-normal'>
            Sign in
          </div>
          <div className='w-9 h-9 cursor-pointer hover:bg-rose-600 flex items-center justify-center bg-rose-700 rounded-full'>
            <Image
              src={Hamburger}
              alt='hamburger icon'
              width={50}
              height={50}
              className='w-6 h-6'
            />
          </div>
        </div>
      </div>

      <div className='w-full max-w-screen-sm mb-2 xs:mb-4 sm:mb-4'>
        <div className='lg:hidden max-md:block max-sm:block h-auto px-2.5 py-1.5 rounded-md border border-gray-300 justify-between items-center gap-2.5 flex'>
          <input
            type='text'
            value={query}
            onChange={onChange}
            placeholder='What do you want to watch?'
            className='text-white text-base font-normal leading-normal bg-transparent border-none outline-none w-full'
            onClick={scrollToMovies}
          />
          <button
            onClick={onChange}
            className='text-white max-sm:hidden bg-transparent border-none outline-none cursor-pointer'
          >
            <Image
              src={Search}
              alt='search-icon'
              className='w-4 h-4 relative'
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
