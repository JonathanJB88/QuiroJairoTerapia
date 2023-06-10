import { render, screen, fireEvent } from '@testing-library/react';
import { CTAButton } from '@/components';

const mockCalendlyInit = jest.fn();
const mockCalendlyBadge = jest.fn();

describe('Layout/CTAButton', () => {
  beforeAll(() => {
    window.Calendly = {
      initPopupWidget: mockCalendlyInit,
      initBadgeWidget: mockCalendlyBadge,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a button with default class name and label', () => {
    render(<CTAButton label='Book Appointment' />);

    const button = screen.getByText(/book appointment/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'px-4 py-1 font-sans text-base md:text-lg font-semibold rounded-md text-navy-blue bg-turquoise md:px-8 md:py-2 hover:bg-opacity-80 transition-all duration-200 ease-in-out'
    );
  });

  it('calls Calendly.initPopupWidget function when the button is clicked', () => {
    render(<CTAButton label='Book Appointment' />);

    const button = screen.getByText(/book appointment/i);
    fireEvent.click(button);

    expect(mockCalendlyInit).toHaveBeenCalledTimes(1);
    expect(mockCalendlyInit).toHaveBeenCalledWith({
      url: expect.any(String),
      text: '¡Reserva tu cita ahora!',
      color: '#1c3d5a',
      textColor: '#ffffff',
      branding: false,
    });
  });

  it('renders a button with custom class name and label', () => {
    render(<CTAButton label='Custom Label' className='custom-class' />);

    const button = screen.getByText(/custom label/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
  });
});
