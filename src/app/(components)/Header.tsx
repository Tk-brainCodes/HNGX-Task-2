import { useState } from "react";
import { Logo, Hamburger, Search } from "../../../assests/icons";
import Image from "next/image";

type Props = {};

function Header({}: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle input change
  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submission (you can implement this as needed)
  const handleSearch = () => {
    // Perform a search with the searchQuery
    // You can add your logic here to handle the search action
    console.log("Search query:", searchQuery);
  };

  return (
    <div className='w-full flex items-center justify-around h-20 absolute z-10'>
      <div className='w-[186px] h-[50px] justify-start items-center gap-6 inline-flex'>
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
      <div className='w-[525px]'>
        <div className='w-full h-9 px-2.5 py-1.5 rounded-md border border-gray-300 justify-between items-center gap-2.5 inline-flex'>
          <input
            type='text'
            value={searchQuery}
            onChange={handleInputChange}
            placeholder='What do you want to watch?'
            className='text-white text-base font-normal leading-normal bg-transparent border-none outline-none w-full'
          />
          <button
            onClick={handleSearch}
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
        <div className='text-white text-base font-bold leading-normal'>
          Sign in
        </div>
        <div className='w-9 h-9 flex items-center justify-center bg-rose-700 rounded-full'>
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
  );
}

export default Header;
