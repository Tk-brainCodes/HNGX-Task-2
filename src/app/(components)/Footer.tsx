import Image from "next/image";
import { Facebook, Instagram, Twitter, Youtube } from "../../../assests/icons";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className='flex items-center justify-center mt-[4em] content-center'>
      <div className='w-[492px] h-auto mb-[2em] flex-col justify-start items-center gap-9 inline-flex'>
        <div className='justify-start items-center gap-12 inline-flex'>
          <Image
            src={Facebook}
            alt='facebook'
            className='w-6 h-[27.43px] hover:brightness-50 cursor-pointer'
          />
          <Image
            src={Instagram}
            alt='instagram'
            className='w-6 h-[27.43px] hover:brightness-50 cursor-pointer'
          />
          <Image src={Twitter} alt='twitter' className='w-6 h-6 hover:brightness-50 cursor-pointer' />
          <Image
            src={Youtube}
            alt='youtube'
            className='w-6 h-[21.33px] hover:brightness-50 cursor-pointer'
          />
        </div>
        <div className='w-[100vw] itemx-center justify-center max-md:flex-wrap items-start gap-12 flex'>
          <div className='text-gray-900 w-auto text-lg font-bold'>
            Conditions of Use
          </div>
          <div className='text-gray-900 w-auto text-lg font-bold'>
            Privacy & Policy
          </div>
          <div className='text-gray-900 w-auto text-lg font-bold'>Press Room</div>
        </div>
        <div className='text-gray-500 text-lg font-bold'>
          © 2021 MovieBox by Adriana Eka Prayudha{" "}
        </div>
      </div>
    </div>
  );
};

export default Footer;
