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
      <div className='fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6'>
        <div
          className='flex items-center'
          onMouseEnter={() => setIsBubbleVisible(true)}
          onMouseLeave={() => setIsBubbleVisible(false)}
        >
          <div className={bubbleClass}>
            <BubbleChat message={quirobotCta} direction='end' />
          </div>
          <button onClick={toggleChatBox} className='w-16 h-16 overflow-hidden rounded-full'>
            <Image
              src='/images/quirobot.jpeg'
              alt='quirobot'
              width={64}
              height={64}
              className='rounded-full animate-pulse-short'
            />
          </button>
        </div>
      </div>
      {showChatBox && <QuirobotChat />}
    </>
  );
};
