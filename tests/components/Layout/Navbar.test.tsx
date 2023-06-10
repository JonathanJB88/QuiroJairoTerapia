import { createRef } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '@/components';
import { menuItems } from '@/pages';

const mockHandleClick = jest.fn();
const mockToggleMenu = jest.fn();

const mockRef = createRef<HTMLHeadingElement>();

describe('Layout/Navbar', () => {
	it('renders the navbar with correct menu items', () => {
		render(
			<Navbar
				menuItems={menuItems}
				activeSection={menuItems[0].id}
				headerRef={mockRef}
				handleClick={mockHandleClick}
				isMenuOpen={false}
				toggleMenu={mockToggleMenu}
			/>
		);

		menuItems.forEach((item) => {
			expect(screen.getByTestId(item.label)).toBeInTheDocument();
		});
	});

	it('calls handleClick when a menu item is clicked', () => {
		render(
			<Navbar
				menuItems={menuItems}
				activeSection={menuItems[0].id}
				headerRef={mockRef}
				handleClick={mockHandleClick}
				isMenuOpen={false}
				toggleMenu={mockToggleMenu}
			/>
		);

		const menuItem = screen.getByTestId(menuItems[0].label);
		fireEvent.click(menuItem);

		expect(mockHandleClick).toHaveBeenCalledTimes(1);
		expect(mockHandleClick).toHaveBeenCalledWith(menuItems[0].id);
	});

	it('calls toggleMenu when the menu button is clicked', () => {
		render(
			<Navbar
				menuItems={menuItems}
				activeSection={menuItems[0].id}
				headerRef={mockRef}
				handleClick={mockHandleClick}
				isMenuOpen={false}
				toggleMenu={mockToggleMenu}
			/>
		);

		const menuButton = screen.getByLabelText('Toggle menu');
		fireEvent.click(menuButton);

		expect(mockToggleMenu).toHaveBeenCalledTimes(1);
	});
});
