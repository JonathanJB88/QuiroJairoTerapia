import { render, screen, fireEvent } from '@testing-library/react';
import { CommentBox } from '@/components';

import { useAuthStore } from '../../../src/hooks/useAuthStore';
import { useUIStore } from '../../../src/hooks/useUIStore';
import { useSubmitComment } from '../../../src/hooks/useSubmitComment';

jest.mock('../../../src/hooks/useAuthStore', () => ({
	useAuthStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useUIStore', () => ({
	useUIStore: jest.fn(),
}));

jest.mock('../../../src/hooks/useSubmitComment', () => ({
	useSubmitComment: jest.fn(),
}));

describe('Experiences/CommentBox', () => {
	beforeEach(() => {
		(useAuthStore as jest.Mock).mockReturnValue({
			status: 'unauthenticated',
			user: null,
			logout: jest.fn(),
		});
		(useUIStore as jest.Mock).mockReturnValue({
			showAuthModal: false,
			showDropdown: false,
			toggleAuthModal: jest.fn(),
			toggleDropdown: jest.fn(),
			resetUI: jest.fn(),
		});
		(useSubmitComment as jest.Mock).mockReturnValue({
			content: '',
			rating: 5,
			isPosting: false,
			onInputChange: jest.fn(),
			handleRatingChange: jest.fn(),
			handleSubmit: jest.fn(),
			onResetForm: jest.fn(),
		});
	});

	it('renders without crashing', () => {
		render(<CommentBox type='comment' />);
		expect(screen.getByText(/Escribe tu comentario/)).toBeInTheDocument();
	});

	it('displays login button when user is unauthenticated', () => {
		render(<CommentBox type='comment' />);
		expect(screen.getByText(/Iniciar Sesión/)).toBeInTheDocument();
	});

	it('displays user dropdown when user is authenticated', () => {
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			status: 'authenticated',
			user: { name: 'TestUser' },
			logout: jest.fn(),
		});
		render(<CommentBox type='comment' />);
		expect(screen.getByText(/TestUser/)).toBeInTheDocument();
	});

	it('textarea is interactable when user is authenticated', () => {
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			status: 'authenticated',
			user: { name: 'TestUser' },
			logout: jest.fn(),
		});
		render(<CommentBox type='comment' />);
		expect(
			screen.getByLabelText(/Describe tu experiencia aquí/)
		).not.toBeDisabled();
	});

	it('textarea is disabled when user is unauthenticated', () => {
		render(<CommentBox type='comment' />);
		expect(
			screen.getByLabelText(/Inicia sesión para escribir un comentario./)
		).toBeDisabled();
	});

	it('displays star rating for reviews when user is authenticated', () => {
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			status: 'authenticated',
			user: { name: 'TestUser' },
			logout: jest.fn(),
		});
		render(<CommentBox type='review' />);
		expect(screen.getByText(/Califica el Servicio/)).toBeInTheDocument();
	});

	it('submit button displays correct text based on posting state', () => {
		render(<CommentBox type='comment' />);
		expect(screen.getByTestId('submit-comment-button')).toBeInTheDocument();
		(useSubmitComment as jest.Mock).mockReturnValueOnce({
			content: '',
			rating: 5,
			isPosting: true,
			onInputChange: jest.fn(),
			handleRatingChange: jest.fn(),
			handleSubmit: jest.fn(),
			onResetForm: jest.fn(),
		});
		render(<CommentBox type='comment' />);
		expect(screen.getByText(/Publicando.../)).toBeInTheDocument();
	});

	it('displays logout button when user dropdown is clicked and handles logout interaction', () => {
		const mockLogout = jest.fn();
		(useAuthStore as jest.Mock).mockReturnValueOnce({
			status: 'authenticated',
			user: { name: 'TestUser' },
			logout: mockLogout,
		});
		(useUIStore as jest.Mock).mockReturnValueOnce({
			showAuthModal: false,
			showDropdown: true, // Mocking dropdown to be open
			toggleAuthModal: jest.fn(),
			toggleDropdown: jest.fn(),
			resetUI: jest.fn(),
		});

		render(<CommentBox type='comment' />);

		// Check if the logout button is visible
		const logoutButton = screen.getByText(/Logout/);
		expect(logoutButton).toBeInTheDocument();

		// Simulate a click on the logout button
		fireEvent.click(logoutButton);

		// Ensure the logout function from useAuthStore is called
		expect(mockLogout).toHaveBeenCalledTimes(1);
	});
});
