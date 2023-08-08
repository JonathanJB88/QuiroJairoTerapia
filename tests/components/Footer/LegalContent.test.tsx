import React from 'react';
import { render, screen } from '@testing-library/react';
import {
	LegalContent,
	PrivacyPolicyContent,
	TermsOfServiceContent,
} from '@/components/Footer/LegalContent';
import { privacyPolicyContent, termsOfServiceContent } from '@/data';

describe('Footer/Legal', () => {
	describe('LegalContent Component', () => {
		it('renders titles and texts correctly', () => {
			render(<LegalContent content={privacyPolicyContent} />);

			const h3 = screen.getAllByRole('heading', { level: 3 });
			const p = screen.getAllByTestId('parragraph');

			expect(h3.length).toBe(privacyPolicyContent.length);
			expect(p.length).toBe(privacyPolicyContent.length);
		});
	});

	describe('PrivacyPolicyContent Component', () => {
		it('renders the correct number of titles', () => {
			render(<PrivacyPolicyContent />);
			const h3 = screen.getAllByRole('heading', { level: 3 });
			expect(h3.length).toBe(privacyPolicyContent.length);
		});

		it('renders the correct react element', () => {
			render(<PrivacyPolicyContent />);

			const listElements = screen.getAllByRole('listitem');
			expect(listElements.length).toBe(4);
		});
	});

	describe('TermsOfServiceContent Component', () => {
		it('renders without crashing', () => {
			const { container } = render(<TermsOfServiceContent />);
			expect(container).toBeInTheDocument();
		});

		it('renders the correct number of titles and texts', () => {
			render(<TermsOfServiceContent />);
			const h3 = screen.getAllByRole('heading', { level: 3 });
			const p = screen.getAllByTestId('parragraph');
			expect(h3.length).toBe(termsOfServiceContent.length);
			expect(p.length).toBe(termsOfServiceContent.length);
		});
	});
});
