import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { BubbleChatBox } from '@/components';

const quirobotCta = '¡Hola!👋 Soy Quirobot. ¿Buscas el masaje ideal? ¡Chatea conmigo ahora! 😊';
const baseClass =
  'absolute transition-all duration-200 ease-in-out opacity-0 bottom-0 right-12 md:bottom-0 md:right-14';

export const ChatButton = () => {
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);

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
    <div className='fixed z-50 bottom-4 right-4 md:bottom-6 md:right-6'>
      <div
        className='relative group'
        onMouseEnter={() => setIsBubbleVisible(true)}
        onMouseLeave={() => setIsBubbleVisible(false)}
      >
        <div className={bubbleClass}>
          <BubbleChatBox message={quirobotCta} direction='end' />
        </div>
        <button className='relative overflow-hidden rounded-full shadow-lg w-14 h-14 md:w-16 md:h-16'>
          <Image src='/images/quirobot.jpeg' alt='quirobot' width={64} height={64} className='rounded-full' />
        </button>
      </div>
    </div>
  );
};
