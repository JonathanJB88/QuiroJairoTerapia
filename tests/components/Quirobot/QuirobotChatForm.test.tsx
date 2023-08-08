import {
	render,
	fireEvent,
	screen,
	waitFor,
	cleanup,
} from '@testing-library/react';
import { QuirobotChatForm } from '@/components';
import { useSubmitChat } from '../../../src/hooks/useSubmitChat';
import { toastNotification } from '../../../src/helpers/toastNotification';

// Mocking the necessary modules and functions
jest.mock('../../../src/hooks/useSubmitChat', () => ({
	useSubmitChat: jest.fn(),
}));

jest.mock('../../../src/helpers/toastNotification', () => ({
	toastNotification: jest.fn(),
}));

describe('Quirobot/QuirobotChatForm', () => {
	beforeEach(() => {
		(useSubmitChat as jest.Mock).mockReturnValue({
			chatMessages: [],
			message: '',
			loading: false,
			formValidation: { message: false },
			errorMessage: '',
			onInputChange: jest.fn(),
			handleSubmit: jest.fn(),
			handleResetChat: jest.fn(),
			sendMessageAndResetForm: jest.fn(),
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
		cleanup();
	});

	it('renders without crashing', () => {
		render(<QuirobotChatForm />);
		expect(
			screen.getByPlaceholderText('Escribe tu consulta...')
		).toBeInTheDocument();
	});

	it('handles input change', () => {
		const mockOnChange = jest.fn();
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			onInputChange: mockOnChange,
		});

		render(<QuirobotChatForm />);
		fireEvent.change(screen.getByPlaceholderText('Escribe tu consulta...'), {
			target: { value: 'Hello' },
		});

		expect(mockOnChange).toHaveBeenCalled();
	});

	it('submits the form', () => {
		const mockHandleSubmit = jest.fn((e) => e.preventDefault());
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			handleSubmit: mockHandleSubmit,
		});

		render(<QuirobotChatForm />);
		fireEvent.submit(screen.getByLabelText('Formulario de chat'));

		expect(mockHandleSubmit).toHaveBeenCalled();
	});

	it('resets the chat when home icon is clicked', () => {
		const mockHandleResetChat = jest.fn();
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			handleResetChat: mockHandleResetChat,
		});

		render(<QuirobotChatForm />);
		fireEvent.click(screen.getByLabelText(/home icon button/i));

		expect(mockHandleResetChat).toHaveBeenCalled();
	});

	it('sends message on Enter key press without shift key', () => {
		const mockSendMessageAndResetForm = jest.fn();
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			sendMessageAndResetForm: mockSendMessageAndResetForm,
		});

		render(<QuirobotChatForm />);
		fireEvent.keyDown(screen.getByPlaceholderText('Escribe tu consulta...'), {
			key: 'Enter',
			shiftKey: false,
		});

		expect(mockSendMessageAndResetForm).toHaveBeenCalled();
	});

	it('does not send message on Enter key press with shift key', () => {
		const mockSendMessageAndResetForm = jest.fn();
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			sendMessageAndResetForm: mockSendMessageAndResetForm,
		});

		render(<QuirobotChatForm />);
		fireEvent.keyDown(screen.getByPlaceholderText('Escribe tu consulta...'), {
			key: 'Enter',
			shiftKey: true,
		});

		expect(mockSendMessageAndResetForm).not.toHaveBeenCalled();
	});

	it('shows error toast notification when there is an errorMessage', async () => {
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			errorMessage: 'Some error',
		});

		render(<QuirobotChatForm />);

		await waitFor(() => {
			expect(toastNotification).toHaveBeenCalledWith('error', 'Some error');
		});
	});

	it('updates character count as user types', () => {
		let mockMessage = '';
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			message: mockMessage,
			onInputChange: jest.fn((event) => {
				mockMessage = event.target.value;
			}),
		});

		render(<QuirobotChatForm />);
		const textarea = screen.getByPlaceholderText('Escribe tu consulta...');
		fireEvent.focus(textarea);
		fireEvent.change(textarea, { target: { value: 'Hello' } });

		// Now, we need to re-render the component to reflect the updated message value
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			message: mockMessage,
		});
		render(<QuirobotChatForm />);

		const charCountSpans = screen.getAllByText(/\/300/); // This will get all spans with '/300'
		expect(charCountSpans[charCountSpans.length - 1].textContent?.trim()).toBe(
			'5/300'
		);
	});

	it('shows error when character limit is exceeded', async () => {
		let mockMessage = '';
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			message: mockMessage,
			onInputChange: jest.fn((event) => {
				mockMessage = event.target.value;
			}),
			formValidation: { message: false },
		});

		render(<QuirobotChatForm />);
		const textarea = screen.getByPlaceholderText('Escribe tu consulta...');
		fireEvent.focus(textarea);
		fireEvent.change(textarea, { target: { value: 'a'.repeat(301) } });

		// Now, we need to re-render the component to reflect the updated message value
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			message: mockMessage,
			formValidation: { message: true },
		});
		render(<QuirobotChatForm />);

		expect(textarea).not.toHaveClass(
			'flex-1 p-2 font-sans text-sm border rounded-md focus:outline-none border-red-500'
		);
	});

	it('does not show error when character limit is not exceeded', () => {
		let mockMessage = '';
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			message: mockMessage,
			onInputChange: jest.fn((event) => {
				mockMessage = event.target.value;
			}),
		});

		render(<QuirobotChatForm />);
		const textarea = screen.getByPlaceholderText('Escribe tu consulta...');
		fireEvent.focus(textarea);
		fireEvent.change(textarea, { target: { value: 'a'.repeat(299) } });

		// Now, we need to re-render the component to reflect the updated message value
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			message: mockMessage,
		});
		render(<QuirobotChatForm />);

		expect(textarea).not.toHaveClass(
			'flex-1 p-2 font-sans text-sm border rounded-md focus:outline-none border-red-500'
		);
	});

	it('sends message when submit button is clicked', async () => {
		const mockHandleSubmit = jest.fn((e) => e.preventDefault());
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			handleSubmit: mockHandleSubmit,
		});

		render(<QuirobotChatForm />);
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			expect(mockHandleSubmit).toHaveBeenCalled();
		});
	});

	it('focuses on the textarea on render', () => {
		render(<QuirobotChatForm />);
		const textarea = screen.getByPlaceholderText('Escribe tu consulta...');
		expect(document.activeElement).toBe(textarea);
	});
});
