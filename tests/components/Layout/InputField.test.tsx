import { render, screen, fireEvent } from '@testing-library/react';
import { toastNotification } from '@/helpers';
import { InputField } from '@/components';

jest.mock('../../../src/helpers/toastNotification', () => ({
	toastNotification: jest.fn(),
}));

const mockOnChange = jest.fn();

describe('Layout/InputField', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders the input field with correct attributes', () => {
		render(
			<InputField
				name='test'
				type='text'
				placeholder='Test Placeholder'
				value=''
				onChange={() => {}}
				error={null}
			/>
		);

		const inputField = screen.getByPlaceholderText('Test Placeholder');
		expect(inputField).toBeInTheDocument();
		expect(inputField).toHaveAttribute('type', 'text');
		expect(inputField).toHaveAttribute('name', 'test');
	});

	it('calls onChange when the input value changes', () => {
		render(
			<InputField
				name='test'
				type='text'
				placeholder='Test Placeholder'
				value=''
				onChange={mockOnChange}
				error={null}
			/>
		);

		const inputField = screen.getByPlaceholderText('Test Placeholder');
		fireEvent.change(inputField, { target: { value: 'New Value' } });
		expect(mockOnChange).toHaveBeenCalledTimes(1);
	});

	it('displays a toast notification when there is an error', () => {
		render(
			<InputField
				name='test'
				type='text'
				placeholder='Test Placeholder'
				value=''
				onChange={() => {}}
				error='Test Error'
			/>
		);

		expect(toastNotification).toHaveBeenCalledTimes(1);
	});

	it('does not display a toast notification when there is no error', () => {
		render(
			<InputField
				name='test'
				type='text'
				placeholder='Test Placeholder'
				value=''
				onChange={() => {}}
				error=''
			/>
		);

		expect(toastNotification).toHaveBeenCalledTimes(0);
	});

	it('renders the input field with the correct size', () => {
		render(
			<InputField
				name='test'
				type='text'
				placeholder='Test Placeholder'
				value=''
				onChange={() => {}}
				error=''
				size='normal'
			/>
		);

		expect(screen.getByPlaceholderText('Test Placeholder')).toHaveClass(
			'text-base'
		);
	});
});
