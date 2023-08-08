import { render, screen } from '@testing-library/react';
import { Contact } from '@/components';
import { GoogleMap } from '@react-google-maps/api';

jest.mock('@react-google-maps/api', () => ({
	GoogleMap: jest.fn(),
	LoadScriptNext: ({ children }: { children: JSX.Element }) => (
		<div>{children}</div>
	),
	Marker: () => <div data-testid='marker' />,
}));

describe('Contact/Contact component', () => {
	beforeEach(() => {
		render(<Contact />);
	});

	it('renders without crashing', () => {
		const contactElement = screen.getByText(
			/¡Ponte en contacto con QuiroJairoTerapia!/i
		);
		expect(contactElement).toBeInTheDocument();
	});

	it('renders the ContactForm component', () => {
		const contactForm = screen.getByTestId('contact-form');
		expect(contactForm).toBeInTheDocument();
	});

	it('displays the correct address', () => {
		const address = screen.getByText(
			/Dirección: Calle Alpujarras, Leganés, Madrid/i
		);
		expect(address).toBeInTheDocument();
	});

	it('renders the ContactItem components', () => {
		const whatsappIcon = screen.getByTestId('whatsapp-icon');
		const emailIcon = screen.getByTestId('mail-icon');
		expect(whatsappIcon).toBeInTheDocument();
		expect(emailIcon).toBeInTheDocument();
	});

	it('renders the GoogleMap component with correct props', () => {
		expect(GoogleMap).toHaveBeenCalledWith(
			expect.objectContaining({
				center: {
					lat: 40.330119,
					lng: -3.751908,
				},
				zoom: 14,
			}),
			{}
		);
	});

	it('renders the Social components', () => {
		const socialLinks = screen.getAllByTestId('social-icon');
		expect(socialLinks.length).toBe(2);
	});
});
