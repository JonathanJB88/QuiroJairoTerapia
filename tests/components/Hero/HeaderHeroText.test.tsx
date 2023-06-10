import { HeaderHeroText } from '@/components';
import { render } from '@testing-library/react';

describe('Hero/HeaderHeroText', () => {
	it('renders HeaderHeroText', () => {
		const screen = render(<HeaderHeroText />);
		expect(screen.getByText(/QuiroJairoTerapia!/i)).toBeInTheDocument();
	});
});
