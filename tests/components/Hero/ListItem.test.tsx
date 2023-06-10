import { render, screen } from '@testing-library/react';
import { ListItem } from '@/components';

const mockEmoji = { label: 'test label', symbol: '😀' };
const mockText = 'test text';

describe('Hero/ListItem', () => {
  it('renders the emoji and text', () => {
    render(<ListItem emoji={mockEmoji} text={mockText} />);
    const emoji = screen.getByLabelText(mockEmoji.label);
    const text = screen.getByText(mockText);
    expect(emoji).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});
