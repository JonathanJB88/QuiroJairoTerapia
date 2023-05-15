import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import autosize from 'autosize';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { HiHome } from 'react-icons/hi';
import { IoIosSend } from 'react-icons/io';
import { BubbleChat } from '@/components';

export const QuirobotChat = () => {
  const [message, setMessage] = useState<string>('');

  const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const currentTextareaRef = textareaRef.current;

  useEffect(() => {
    if (currentTextareaRef) {
      autosize(currentTextareaRef);
    }
    return () => {
      if (currentTextareaRef) {
        autosize.destroy(currentTextareaRef);
      }
    };
  }, [currentTextareaRef]);

  return (
    <div className='fixed bottom-0 right-0 z-50 flex flex-col w-full h-full max-w-md shadow-lg md:h-1/2 bg-light-gray md:rounded-xl md:bottom-4 md:right-4'>
      {/* Chatbox header */}
      <div className='flex items-center justify-between p-2 text-white bg-turquoise md:rounded-t-xl'>
        <div className='flex items-center'>
          <Image src='/images/quirobot.jpeg' alt='quirobot' width={32} height={32} className='rounded-full' />
          <span className='ml-2 font-sans font-bold'>Quirobot 👋</span>
        </div>
        <RiArrowDropDownLine size={30} />
      </div>
      {/* Chatbox body messages */}
      <div className='flex-grow p-2 overflow-y-auto'>
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='start' />
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='end' />
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='start' />
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='end' />
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='start' />
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='start' />
        <BubbleChat message='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' direction='end' />
      </div>
      {/* Chatbox footer */}
      <div className='border-t border-navy-blue border-opacity-20' />
      <div className='flex items-center p-2 bg-light-gray md:rounded-b-xl'>
        <HiHome className='w-8 h-8 cursor-pointer text-turquoise' />
        <textarea
          className='w-full h-10 p-2 text-sm border rounded-md border-navy-blue-lighter focus:border-transparent focus:outline-none focus:ring-2 focus:ring-turquoise'
          placeholder='Escribe tu pregunta...'
          ref={textareaRef}
          maxLength={300}
          name='message'
          value={message}
          onChange={onMessageChange}
        />
        <IoIosSend className='w-8 h-8 cursor-pointer text-turquoise' />
      </div>
    </div>
  );
};
