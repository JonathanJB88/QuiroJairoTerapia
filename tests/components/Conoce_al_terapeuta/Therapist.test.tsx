import { render, screen } from '@testing-library/react';
import { Therapist } from '@/components';

describe('Therapist Component', () => {
	beforeEach(() => {
		render(<Therapist />);
	});

	it('renders without crashing', () => {
		expect(screen.getByText('¡Hola!, soy Jairo Fajardo.')).toBeInTheDocument();
	});

	it('displays the therapist description correctly', () => {
		expect(
			screen.getByText(
				'Soy Quiromasajista con más de 5 años de experiencia. Mi enfoque se basa en combinar ciencia y arte en la quiropráctica para brindarte un servicio terapéutico único y altamente beneficioso. ¿Estás listo para mejorar tu bienestar?.'
			)
		).toBeInTheDocument();
	});

	it('displays the reservation button correctly', () => {
		const button = screen.getByLabelText('¡Reserva!');
		expect(button).toBeInTheDocument();
	});

	it('displays the therapist image with correct alt text', () => {
		const image = screen.getByAltText('Jairo Fajardo, quiromasajista');
		expect(image).toBeInTheDocument();
	});
});
