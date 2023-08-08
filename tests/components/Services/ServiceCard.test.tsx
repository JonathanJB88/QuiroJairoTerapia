import { cleanup, render, screen } from '@testing-library/react';
import { ServiceCard } from '@/components';
import { Iservice } from '@/interfaces';

describe('Services/ServiceCard', () => {
	const mockService: Iservice = {
		title: 'Test Service',
		price: '100€',
		description: 'This is a test service description.',
		backgroundImageUrl: '/path/to/image.jpg',
	};

	beforeEach(() => {
		render(<ServiceCard service={mockService} />);
	});

	afterEach(() => {
		cleanup();
	});

	it('renders without crashing', () => {
		expect(screen.getByText('Test Service')).toBeInTheDocument();
	});

	it('renders service details correctly', () => {
		expect(screen.getByText('Test Service')).toBeInTheDocument();
		expect(screen.getByText('100€')).toBeInTheDocument();
		expect(
			screen.getByText('This is a test service description.')
		).toBeInTheDocument();
	});

	it('renders the CTA button correctly', () => {
		expect(screen.getByText('¡Reserva!')).toBeInTheDocument();
	});

	it('renders the background image correctly', () => {
		const backgroundImage = screen.getByAltText(
			'Test Service background'
		) as HTMLImageElement;
		expect(backgroundImage.src).toContain('image.jpg');
	});
});
