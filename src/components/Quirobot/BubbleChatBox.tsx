import { useEffect, useState } from 'react';

interface BubbleChatBoxProps {
  message: string;
  direction: 'start' | 'end';
  username?: string;
}

export const BubbleChatBox = ({ message, direction, username }: BubbleChatBoxProps) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
  }, []);

  return (
    <div className={`chat chat-${direction} font-sans`}>
      <div className='chat-header'>
        {username ? username : 'Quirobot'}
        <time className='mx-1 text-xs opacity-50'>{time}</time>
      </div>
      <div className='font-sans text-xs md:text-sm w-80 md:w-96 chat-bubble bg-light-gray text-navy-blue'>
        {message}
      </div>
    </div>
  );
};
