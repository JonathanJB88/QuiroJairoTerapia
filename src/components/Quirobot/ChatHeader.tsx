import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useUIStore } from '@/hooks';

export const ChatHeader = () => {
  const { toggleChatBox } = useUIStore();

  return (
    <div
      onClick={toggleChatBox}
      className='flex items-center justify-between p-2 text-white cursor-pointer bg-turquoise md:rounded-t-xl'
    >
      <div className='flex items-center'>
        <Image src='/images/quirobot.jpeg' alt='quirobot' width={32} height={32} className='rounded-full' />
        <span className='ml-2 font-sans font-bold'>Quirobot 👋</span>
      </div>
      <RiArrowDropDownLine size={30} />
    </div>
  );
};
