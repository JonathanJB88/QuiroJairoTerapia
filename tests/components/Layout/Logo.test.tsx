import { render } from '@testing-library/react';
import { Logo } from '@/components';

describe('Layout/Logo', () => {
  it('should render logo image with correct attributes', () => {
    const { getByAltText } = render(<Logo />);
    const logoImage = getByAltText('QuiroJairoTerapia');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage.getAttribute('src')).toContain(
      'quirojairoterapialogo.jpeg'
    );
    expect(logoImage).toHaveStyle({
      filter: 'drop-shadow(0 0 1px black)',
      objectFit: 'cover',
    });
    expect(logoImage).toHaveAttribute('loading', 'lazy');
    expect(logoImage).toHaveAttribute(
      'sizes',
      '(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px'
    );
  });

  it('should render logo title and tagline', () => {
    const { getByText } = render(<Logo />);
    const logoTitle = getByText('QuiroJairoTerapia');
    const logoTagline = getByText('Alivio y bienestar en tus manos');
    expect(logoTitle).toBeInTheDocument();
    expect(logoTitle).toHaveClass('text-xl');
    expect(logoTitle).toHaveClass('text-navy-blue');
    expect(logoTitle).toHaveClass('font-roboto');
    expect(logoTagline).toBeInTheDocument();
    expect(logoTagline).toHaveClass('text-sm');
    expect(logoTagline).toHaveClass('text-navy-blue');
    expect(logoTagline).toHaveClass('font-roboto');
  });
});
