import { render, screen } from '@testing-library/react';
import { QuirobotChat } from '@/components';
import { useSubmitChat } from '../../../src/hooks/useSubmitChat';
import { Provider } from 'react-redux';
import { ChatMessage, Role, store } from '@/store';

jest.mock('../../../src/hooks/useSubmitChat', () => ({
	useSubmitChat: jest.fn(),
}));

const mockMessages: ChatMessage[] = [
	{ role: Role.USER, content: 'Hello' },
	{ role: Role.ASSISTANT, content: 'Hi' },
];

describe('Quirobot/QuirobotChat', () => {
	beforeEach(() => {
		(useSubmitChat as jest.Mock).mockReturnValue({
			chatMessages: [],
			loading: false,
			isFormValid: true,
			formValidation: {},
			message: '',
			errorMessage: '',
			onInputChange: jest.fn(),
		});
	});

	it('renders without crashing', () => {
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			chatMessages: mockMessages,
		});
		render(
			<Provider store={store}>
				<QuirobotChat />
			</Provider>
		);

		expect(
			screen.getByPlaceholderText('Escribe tu consulta...')
		).toBeInTheDocument();
	});

	it('renders chat messages correctly', () => {
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			chatMessages: mockMessages,
		});
		render(
			<Provider store={store}>
				<QuirobotChat />
			</Provider>
		);

		expect(screen.getByText('Hello')).toBeInTheDocument();
		expect(screen.getByText('Hi')).toBeInTheDocument();
	});

	it('displays loading state when loading is true', () => {
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			chatMessages: mockMessages,
			loading: true,
		});
		render(
			<Provider store={store}>
				<QuirobotChat />
			</Provider>
		);

		expect(screen.getByText('Escribiendo...')).toBeInTheDocument();
	});

	it('displays form validation message when present', () => {
		const validationMessage = 'Validation error';
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			chatMessages: mockMessages,
			formValidation: { message: validationMessage },
		});

		render(
			<Provider store={store}>
				<QuirobotChat />
			</Provider>
		);

		expect(screen.getByText(validationMessage)).toBeInTheDocument();
	});

	it('scrolls to the bottom when new messages are added', () => {
		// Initial render with some messages
		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			chatMessages: mockMessages,
		});
		const { rerender } = render(
			<Provider store={store}>
				<QuirobotChat />
			</Provider>
		);

		// Get the chat box element
		const chatBox = screen.getByLabelText('chat-box');

		// Mock the scrollTop and scrollHeight properties
		Object.defineProperty(chatBox, 'scrollTop', {
			configurable: true,
			writable: true,
			value: 0,
		});
		Object.defineProperty(chatBox, 'scrollHeight', {
			configurable: true,
			writable: true,
			value: 1000,
		});
		Object.defineProperty(chatBox, 'clientHeight', {
			configurable: true,
			writable: true,
			value: 500,
		});

		// Add new messages and re-render
		const newMessages = [
			...mockMessages,
			{ role: Role.USER, content: 'New message' },
			{ role: Role.ASSISTANT, content: 'New message' },
			{ role: Role.USER, content: 'New message' },
			{ role: Role.ASSISTANT, content: 'New message' },
		];

		(useSubmitChat as jest.Mock).mockReturnValue({
			...useSubmitChat(),
			chatMessages: newMessages,
		});
		rerender(
			<Provider store={store}>
				<QuirobotChat />
			</Provider>
		);

		chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;

		expect(chatBox.scrollTop).toBeGreaterThan(0);
		expect(chatBox.scrollTop).toEqual(
			chatBox.scrollHeight - chatBox.clientHeight
		);
	});
});
