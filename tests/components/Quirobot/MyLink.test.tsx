import { render, screen } from '@testing-library/react';
import { MyLink } from '@/components';

describe('Quirobot/MyLink', () => {
	it('renders the link with correct attributes and children', () => {
		render(<MyLink href='https://example.com'>Visit Example</MyLink>);

		const linkElement = screen.getByText('Visit Example');

		// Check if the link is in the document
		expect(linkElement).toBeInTheDocument();

		// Check href attribute
		expect(linkElement).toHaveAttribute('href', 'https://example.com');

		// Check target attribute
		expect(linkElement).toHaveAttribute('target', '_blank');

		// Check rel attribute
		expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');

		// Check class names
		expect(linkElement).toHaveClass('font-sans');
		expect(linkElement).toHaveClass('font-medium');
		expect(linkElement).toHaveClass('underline');
		expect(linkElement).toHaveClass('text-navy-blue');
	});
});
