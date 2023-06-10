import { render } from '@testing-library/react';
import { Emoji } from '@/components';

const label = 'heart-eyes';
const symbol = '😍';

describe('Hero/Emoji', () => {
	it('renders the symbol and sets the correct aria-label', () => {
		const { getByRole } = render(<Emoji label={label} symbol={symbol} />);
		const emojiSpan = getByRole('img');
		expect(emojiSpan.textContent).toEqual(symbol);
		expect(emojiSpan).toHaveAttribute('aria-label', label);
	});
});
