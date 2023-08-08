import { render, screen } from '@testing-library/react';
import { FaFacebook } from 'react-icons/fa'; // Example icon for testing
import { Social } from '@/components';

describe('Contact/Social', () => {
	it('renders without crashing', () => {
		render(<Social Icon={FaFacebook} href='https://facebook.com' />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toBeInTheDocument();
	});

	it('renders the correct icon', () => {
		render(<Social Icon={FaFacebook} href='https://facebook.com' />);

		const iconElement = screen.getByTestId('social-icon');
		expect(iconElement).toBeInTheDocument();
	});

	it('has the correct href attribute', () => {
		const testHref = 'https://facebook.com';
		render(<Social Icon={FaFacebook} href={testHref} />);

		const linkElement = screen.getByRole('link');
		expect(linkElement).toHaveAttribute('href', testHref);
	});
});
