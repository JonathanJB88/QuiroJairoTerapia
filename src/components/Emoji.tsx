interface EmojiProps {
  label: string;
  symbol: string;
}

export const Emoji = ({ label, symbol }: EmojiProps) => (
  <span role='img' aria-label={label}>
    {symbol}
  </span>
);
