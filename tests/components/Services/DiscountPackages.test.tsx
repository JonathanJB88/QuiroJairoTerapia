import { render, screen } from '@testing-library/react';
import { DiscountPackages } from '@/components';

describe('Services/DiscountPackages', () => {
	it('renders without crashing', () => {
		render(<DiscountPackages />);
		expect(
			screen.getByText('Paquetes de descuento para clientes frecuentes:')
		).toBeInTheDocument();
	});

	it('renders discount packages correctly', () => {
		render(<DiscountPackages />);
		expect(screen.getByText('Bono de 5 sesiones:')).toBeInTheDocument();
		expect(
			screen.getByText(
				'¡Disfruta de un 10% de descuento en el total! Paga solo 180€ en lugar de 200€.'
			)
		).toBeInTheDocument();
		expect(screen.getByText('Bono de 10 sesiones:')).toBeInTheDocument();
		expect(
			screen.getByText(
				'¡Aprovecha un 20% de descuento en el total! Paga solo 320€ en lugar de 400€.'
			)
		).toBeInTheDocument();
	});

	it('renders the CTA button correctly', () => {
		render(<DiscountPackages />);
		expect(screen.getByText('¡Reserva!')).toBeInTheDocument();
	});
});
