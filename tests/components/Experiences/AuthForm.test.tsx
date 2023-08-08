import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from '@/components';

import { useAuthentication } from '../../../src/hooks/useAuthentication';
import { useAuthStore } from '../../../src/hooks/useAuthStore';
import { useUIStore } from '../../../src/hooks/useUIStore';

jest.mock('../../../src/hooks/useAuthentication', () => ({
	useAuthentication: jest.fn(),
}));

jest.mock('../../../src/hooks/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useUIStore', () => ({
	useUIStore: jest.fn(),
}));

describe('Experiences/AuthForm', () => {
	beforeEach(() => {
		(useAuthentication as jest.Mock).mockReturnValue({
			loginEmail: '',
			loginPassword: '',
			loginFormValidation: {},
			onLoginInputChange: jest.fn(),
			onResetLoginForm: jest.fn(),
			registerName: '',
			registerEmail: '',
			registerPassword: '',
			registerConfirmPassword: '',
			registerFormValidation: {},
			onRegisterInputChange: jest.fn(),
			onResetRegisterForm: jest.fn(),
			formSubmit: jest.fn(),
		});
		(useAuthStore as jest.Mock).mockReturnValue({
			status: 'idle',
		});
		(useUIStore as jest.Mock).mockReturnValue({
			toggleAuthModal: jest.fn(),
		});
	});

	it('renders without crashing', () => {
		render(<AuthForm type='login' toogleIsFlipped={jest.fn()} />);
		expect(screen.getByRole('form')).toBeInTheDocument();
		expect(
			screen.getByRole('heading', {
				name: /Acceder para dejar una reseña/i,
			})
		).toBeInTheDocument();
	});

	it('displays login fields when type is "login"', () => {
		render(<AuthForm type='login' toogleIsFlipped={jest.fn()} />);
		expect(
			screen.getByPlaceholderText('Correo electrónico')
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
		expect(screen.queryByPlaceholderText('Nombre')).not.toBeInTheDocument();
		expect(
			screen.queryByPlaceholderText('Confirmar contraseña')
		).not.toBeInTheDocument();
	});

	it('displays register fields when type is "register"', () => {
		render(<AuthForm type='register' toogleIsFlipped={jest.fn()} />);
		expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Correo electrónico')
		).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText('Confirmar contraseña')
		).toBeInTheDocument();
	});

	it('calls formSubmit on form submission', () => {
		const formSubmit = jest.fn();
		(useAuthentication as jest.Mock).mockReturnValueOnce({
			...useAuthentication('login'),
			formSubmit,
		});
		render(<AuthForm type='login' toogleIsFlipped={jest.fn()} />);
		fireEvent.submit(screen.getByRole('form'));
		expect(formSubmit).toHaveBeenCalled();
	});

	it('resets the form and toggles the form type on CTA button click', () => {
		const onResetLoginForm = jest.fn();
		const toogleIsFlipped = jest.fn();
		(useAuthentication as jest.Mock).mockReturnValueOnce({
			...useAuthentication('login'),
			onResetLoginForm,
		});
		render(<AuthForm type='login' toogleIsFlipped={toogleIsFlipped} />);
		fireEvent.click(screen.getByText('¿No tienes una cuenta?, Regístrate'));
		expect(onResetLoginForm).toHaveBeenCalled();
		expect(toogleIsFlipped).toHaveBeenCalled();
	});

	it('closes the modal on close button click', () => {
		const toggleAuthModal = jest.fn();
		(useUIStore as jest.Mock).mockReturnValueOnce({
			toggleAuthModal,
		});
		render(<AuthForm type='login' toogleIsFlipped={jest.fn()} />);
		fireEvent.click(screen.getByText('×'));
		expect(toggleAuthModal).toHaveBeenCalled();
	});
});
