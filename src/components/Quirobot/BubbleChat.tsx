import { useEffect, useMemo, useState } from 'react';
import Linkify from 'react-linkify';
import { MyLink } from '@/components';

interface BubbleChatProps {
  message: string;
  direction: 'start' | 'end';
  username?: string;
  animation?: boolean;
}

export const BubbleChat = ({
  message,
  direction,
  username,
  animation,
}: BubbleChatProps) => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      })
    );
  }, []);

  const bubbleStyles = useMemo(() => {
    let styles = `flex p-2 flex-col shadow-sm text-xs md:text-sm rounded-xl bg-light-gray drop-shadow shadow-navy-blue-lighter ${
      animation ? 'animate-pulse-short' : ''
    }`;
    styles +=
      direction === 'end' ? ' items-end text-right' : ' items-start text-left';
    return styles;
  }, [direction, animation]);

  const textStyles = useMemo(() => {
    let styles = 'flex items-center text-sm font-sans font-medium';
    styles += direction === 'end' ? ' justify-end' : ' justify-start';
    return styles;
  }, [direction]);

  const containerStyles = useMemo(() => {
    let styles = 'flex flex-col m-1 ml-2 text-navy-blue font-sans w-auto';
    styles += direction === 'end' ? ' items-end' : ' items-start';
    return styles;
  }, [direction]);

  return (
    <div className={containerStyles}>
      <div className={bubbleStyles}>
        <div className={textStyles}>
          <p>{username ? username : 'Quirobot'}</p>
          <time className='mx-1 text-xs opacity-50'>{time}</time>
        </div>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <MyLink key={key} href={decoratedHref}>
              {decoratedText}
            </MyLink>
          )}
        >
          {message}
        </Linkify>
      </div>
    </div>
  );
};
