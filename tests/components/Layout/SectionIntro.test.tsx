import { render, screen } from '@testing-library/react';
import { SectionIntro } from '@/components';

const title = 'Test Title';
const description = 'Test Description';

describe('Layout/SectionIntro', () => {
  it('should render the title and description', () => {
    render(<SectionIntro title={title} description={description} />);

    const renderedTitle = screen.getByText(title);
    const renderedDescription = screen.getByText(description);

    expect(renderedTitle).toBeInTheDocument();
    expect(renderedDescription).toBeInTheDocument();
  });
});
