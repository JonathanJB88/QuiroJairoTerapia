import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ContactForm } from '@/components';
import { useContact } from '../../../src/hooks/useContact';

jest.mock('../../../src/hooks/useContact', () => ({
	useContact: jest.fn(),
}));

describe('Contact/ContactForm', () => {
	beforeEach(() => {
		(useContact as jest.Mock).mockReturnValue({
			name: '',
			email: '',
			phone: '',
			message: '',
			loading: false,
			formValidation: {},
			onInputChange: jest.fn(),
			handleSubmit: jest.fn(),
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
		cleanup();
	});

	it('renders without crashing', () => {
		render(<ContactForm />);
		const formElement = screen.getByRole('form');
		expect(formElement).toBeInTheDocument();
	});

	it('contains the correct input fields', () => {
		render(<ContactForm />);
		const nameInput = screen.getByPlaceholderText(/Tu nombre/i);
		const emailInput = screen.getByPlaceholderText(/Tu correo electrónico/i);
		const phoneInput = screen.getByPlaceholderText(/Tu número de teléfono/i);

		expect(nameInput).toBeInTheDocument();
		expect(emailInput).toBeInTheDocument();
		expect(phoneInput).toBeInTheDocument();
	});

	it('contains the correct textarea', () => {
		render(<ContactForm />);
		const textareaElement = screen.getByPlaceholderText(
			/Escribe tu mensaje aquí.../i
		);
		expect(textareaElement).toBeInTheDocument();
	});

	it('contains the submit button with correct text', () => {
		render(<ContactForm />);
		const buttonElement = screen.getByRole('button', {
			name: /Envía tu mensaje/i,
		});
		expect(buttonElement).toBeInTheDocument();
	});

	it('calls onInputChange when input values change', () => {
		const onInputChangeMock = jest.fn((event) => {
			mockName = event.target.value;
		});
		let mockName = '';
		(useContact as jest.Mock).mockReturnValue({
			...useContact(),
			onInputChange: onInputChangeMock,
		});
		const { rerender } = render(<ContactForm />);
		const nameInput = screen.getByPlaceholderText(
			'Tu nombre'
		) as HTMLInputElement;
		fireEvent.change(nameInput, { target: { value: 'John Doe' } });

		expect(onInputChangeMock).toHaveBeenCalled();

		(useContact as jest.Mock).mockReturnValue({
			...useContact(),
			name: mockName,
		});

		rerender(<ContactForm />);
		const updatedNameInput = screen.getByPlaceholderText(
			'Tu nombre'
		) as HTMLInputElement;
		expect(updatedNameInput.value).toBe('John Doe');
	});

	it('calls handleSubmit when form is submitted', () => {
		const handleSubmitMock = jest.fn();
		(useContact as jest.Mock).mockReturnValue({
			...useContact(),
			handleSubmit: handleSubmitMock,
		});
		render(<ContactForm />);
		const formElement = screen.getByRole('form');
		fireEvent.submit(formElement);
		expect(handleSubmitMock).toHaveBeenCalled();
	});

	it('displays loading text on the button when loading', () => {
		(useContact as jest.Mock).mockReturnValue({
			...useContact(),
			loading: true,
		});
		render(<ContactForm />);
		const buttonElement = screen.getByRole('button', {
			name: /Enviando tu mensaje.../i,
		});
		expect(buttonElement).toBeInTheDocument();
	});

	it('displays validation error for the message', () => {
		(useContact as jest.Mock).mockReturnValue({
			...useContact(),
			formValidation: { message: 'Error message' },
		});
		render(<ContactForm />);
		const textareaElements = screen.getAllByPlaceholderText(
			'Escribe tu mensaje aquí...'
		);
		expect(textareaElements[0]).toHaveClass('border-red-500');
	});
});
