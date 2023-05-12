import { Emoji } from '@/components';

interface ListItemProps {
  emoji: {
    label: string;
    symbol: string;
  };
  text: string;
}

export const ListItem = ({ emoji, text }: ListItemProps) => (
  <li className='font-sans text-sm list-none md:text-lg'>
    <Emoji label={emoji.label} symbol={emoji.symbol} /> {text}
  </li>
);
