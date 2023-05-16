import { useEffect, useState } from 'react';

interface BubbleChatProps {
  message: string;
  direction: 'start' | 'end';
  username?: string;
  animation?: boolean;
}

export const BubbleChat = ({ message, direction, username, animation }: BubbleChatProps) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
  }, []);

  // Base styles for the bubble.
  let bubbleStyles = `flex p-2 flex-col shadow-sm text-xs md:text-sm rounded-xl bg-light-gray drop-shadow shadow-navy-blue-lighter ${
    animation ? 'animate-pulse-short' : ''
  }`;
  let textStyles = 'flex items-center text-sm font-sans font-medium';

  // Conditionally append classes based on the direction prop.
  if (direction === 'end') {
    bubbleStyles += ' items-end text-right';
    textStyles += ' justify-end';
  } else {
    bubbleStyles += ' items-start text-left';
    textStyles += ' justify-start';
  }

  // Align the container div to the left or right based on the direction
  let containerStyles = 'flex flex-col m-1 ml-2 text-navy-blue font-sans w-auto';
  if (direction === 'end') {
    containerStyles += ' items-end';
  } else {
    containerStyles += ' items-start';
  }

  return (
    <div className={containerStyles}>
      <div className={bubbleStyles}>
        <div className={textStyles}>
          <p>{username ? username : 'Quirobot'}</p>
          <time className='mx-1 text-xs opacity-50'>{time}</time>
        </div>
        {message}
      </div>
    </div>
  );
};
