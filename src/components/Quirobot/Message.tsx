import { BubbleChat } from '@/components';
import { ChatMessage } from '@/store';

interface ChatMessageProps {
  msg: ChatMessage;
  index: number;
  isLast: boolean;
}

export const Message = ({ msg, index, isLast }: ChatMessageProps) => {
  if (msg.role === 'assistant')
    return <BubbleChat message={msg.content} direction='start' animation={isLast} key={index} />;
  if (msg.role === 'user')
    return <BubbleChat username='Cliente' message={msg.content} direction='end' animation={isLast} key={index} />;
  return null;
};
