import { render, screen, fireEvent, act } from '@testing-library/react';
import { ShareButtons } from '@/components';
import { toastNotification } from '../../../src/helpers/toastNotification';

// Mock the toastNotification function
jest.mock('../../../src/helpers/toastNotification', () => ({
  ...jest.requireActual('../../../src/helpers/toastNotification'),
  toastNotification: jest.fn(),
}));

const mockProps = {
  title: 'Test Title',
  currentPath: '/test-path',
};

describe('Blog/ShareButtons', () => {

  beforeEach(() => {
    render(<ShareButtons {...mockProps} />);
  });

  it('renders the copy link button', () => {
    const copyIcon = screen.getByTestId('copy-link-icon');
    expect(copyIcon).toBeInTheDocument();
  });

  it('renders the Facebook share button', () => {
    const facebookIcon = screen.getAllByTestId('social-icon')[0].parentElement;
    expect(facebookIcon).toBeInTheDocument();
    expect(facebookIcon).toHaveAttribute('href', expect.stringContaining('facebook.com'));
  });

  it('renders the Twitter share button', () => {
    const twitterIcon = screen.getAllByTestId('social-icon')[1].parentElement;
    expect(twitterIcon).toBeInTheDocument();
    expect(twitterIcon).toHaveAttribute('href', expect.stringContaining('twitter.com'));
  });

  it('renders the Whatsapp share button', () => {
    const whatsappIcon = screen.getAllByTestId('social-icon')[2].parentElement;
    expect(whatsappIcon).toBeInTheDocument();
    expect(whatsappIcon).toHaveAttribute('href', expect.stringContaining('api.whatsapp.com'));
  });

  it('copies the link to clipboard when copy icon is clicked', async () => {
    // Mock the clipboard.writeText method
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(true),
    };
    Object.defineProperty(global.navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
      configurable: true,
    });
  
    const copyIcon = screen.getByTestId('copy-link-icon');
    
    await act(async () => {
      fireEvent.click(copyIcon);
    });
  
    expect(mockClipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('/test-path'));
    expect(toastNotification).toHaveBeenCalledWith('success', '¡Enlace copiado al portapapeles, listo para compartir!');
  });  
});
