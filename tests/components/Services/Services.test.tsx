import { render, screen } from '@testing-library/react';
import { Services } from '@/components';
import { services } from '@/data';
import { useWindowSize } from '../../../src/hooks/useWindowSize';

jest.mock('../../../src/hooks/useWindowSize', () => ({
	useWindowSize: jest.fn(() => ({ width: 1024, height: 768 })),
}));

describe('Services/Services component', () => {
	it('renders without crashing', () => {
		render(<Services />);
		expect(
			screen.getByText(/Servicios de QuiroJairoTerapia/i)
		).toBeInTheDocument();
	});

	it('renders the SectionIntro with the correct title and description', () => {
		render(<Services />);
		expect(
			screen.getByText(/Servicios de QuiroJairoTerapia/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(
				/¡Descubre la magia del quiromasaje con QuiroJairoTerapia!/i
			)
		).toBeInTheDocument();
	});

	it('renders the ServiceCard for each service', () => {
		render(<Services />);
		services.forEach((service) => {
			const titleElements = screen.getAllByText(service.title);
			expect(titleElements[0]).toBeInTheDocument(); // Adjust due to the carousel behavior cloning the slides
		});
		expect(screen.getAllByRole('listitem')).toHaveLength(services.length + 2); // Adjust due to the carousel behavior cloning the slides
	});

	it('renders the DiscountPackages component', () => {
		render(<Services />);
		expect(
			screen.getByText(/Paquetes de descuento para clientes frecuentes:/i)
		).toBeInTheDocument();
	});

	it('renders the CustomArrow components for carousel navigation', () => {
		render(<Services />);
		expect(screen.getByLabelText('previous slide / item')).toBeInTheDocument();
		expect(screen.getByLabelText('next slide / item')).toBeInTheDocument();
	});
});
