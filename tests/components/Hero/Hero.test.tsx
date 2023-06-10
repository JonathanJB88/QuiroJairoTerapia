import { render } from '@testing-library/react';
import { Hero } from '@/components';

const heroDescription =
	'Despierta tus sentidos y libera tu cuerpo del estrés con los tratamientos especializados de Jairo, el experto en quiromasaje que te ayudará a recuperar la armonía y el bienestar que te mereces.';

describe('Hero', () => {
	it('should render the correct header hero text', () => {
		const { getByText } = render(<Hero />);
		expect(getByText(/QuiroJairoTerapia!/i)).toBeInTheDocument();
	});

	it('should render the correct hero description', () => {
		const { getByText } = render(<Hero />);
		expect(getByText(heroDescription)).toBeInTheDocument();
	});

	it('should render the correct number of list items', () => {
		const { getAllByRole } = render(<Hero />);
		expect(getAllByRole('listitem')).toHaveLength(4);
	});

	it('should render the CTA button', () => {
		const { getByText } = render(<Hero />);
		expect(getByText('¡Reserva tu cita ahora!')).toBeInTheDocument();
	});
});
