import { render, screen } from '@testing-library/react';
import { ContactItem } from '@/components';
import {
	FaWhatsapp as MailIcon,
	FaMailBulk as WhatsAppIcon,
} from 'react-icons/fa';

describe('Contact/ContactItem', () => {
	it('renders mail contact correctly', () => {
		render(
			<ContactItem icon={<MailIcon />} type='mail' contact='test@example.com' />
		);

		const linkElement = screen.getByRole('link', {
			name: 'mailto:test@example.com',
		});
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute('href', 'mailto:test@example.com');
		expect(screen.getByText('test@example.com')).toBeInTheDocument();
		expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
	});

	it('renders WhatsApp contact correctly', () => {
		render(
			<ContactItem
				icon={<WhatsAppIcon />}
				type='whatsapp'
				contact='1234567890'
			/>
		);

		const linkElement = screen.getByRole('link', {
			name: 'https://wa.me/1234567890',
		});
		expect(linkElement).toBeInTheDocument();
		expect(linkElement).toHaveAttribute('href', 'https://wa.me/1234567890');
		expect(screen.getByText('1234567890')).toBeInTheDocument();
		expect(screen.getByTestId('whatsapp-icon')).toBeInTheDocument(); // Assuming you have a data-testid on your icon
	});
});
