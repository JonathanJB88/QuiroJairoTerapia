import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from '@/components';

describe('Footer/Footer Component', () => {
	it('renders without crashing', () => {
		render(<Footer />);
		expect(screen.getByText(/© \d{4} QuiroJairoTerapia/)).toBeInTheDocument();
	});

	it('opens the Privacy Policy modal when the corresponding button is clicked', () => {
		render(<Footer />);
		const privacyButton = screen.getByTestId('privacy-button');
		fireEvent.click(privacyButton);
		const h2 = screen.getByRole('heading', { level: 2 });
		expect(h2).toBeInTheDocument();
	});

	it('opens the Terms of Service modal when the corresponding button is clicked', () => {
		render(<Footer />);
		const termsButton = screen.getByTestId('terms-button');
		fireEvent.click(termsButton);
		const h2 = screen.getByRole('heading', { level: 2 });
		expect(h2).toBeInTheDocument();
	});

	it('closes the modal when it is open and the close button is clicked', () => {
		render(<Footer />);
		const privacyButton = screen.getByTestId('privacy-button');
		fireEvent.click(privacyButton);
		const closeButton = screen.getByText(/cerrar/i);
		fireEvent.click(closeButton);
		expect(screen.queryByLabelText('modal')).not.toBeInTheDocument();
	});
});
