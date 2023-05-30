import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { BubbleChat, QuirobotChat } from '@/components';
import { useUIStore } from '@/hooks';

const quirobotCta = '¡Hola!👋 Soy Quirobot. ¿Buscas el masaje ideal? ¡Chatea conmigo ahora! 😊';
const baseClass = 'transition-all duration-200 ease-in-out opacity-0';

export const ChatButton = () => {
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const { showChatBox, toggleChatBox } = useUIStore();

  const bubbleClass = isBubbleVisible ? `${baseClass} opacity-100 visible` : `${baseClass} invisible`;

  const handleScroll = useCallback(() => {
    setIsBubbleVisible(false);
    window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBubbleVisible(false);
    }, 10000);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div className='fixed z-50 bottom-4 right-4'>
        <div className='flex items-center'>
          <div className={bubbleClass}>
            <BubbleChat message={quirobotCta} direction='end' />
          </div>

          <button
            onClick={toggleChatBox}
            className='relative w-16 h-16 rounded-full shadow-md aspect-square drop-shadow-md shadow-navy-blue'
          >
            <Image
              src='/images/quirobot_picture.jpeg'
              alt='quirobot'
              className='object-fill rounded-full'
              loading='lazy'
              fill
              sizes='(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px'
              onMouseEnter={() => setIsBubbleVisible(true)}
              onMouseLeave={() => setIsBubbleVisible(false)}
            />
          </button>
        </div>
      </div>
      {showChatBox && <QuirobotChat />}
    </>
  );
};
