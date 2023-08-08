import React from 'react';
import { privacyPolicyContent, termsOfServiceContent } from '@/data';
import { Content } from '@/interfaces';

const h3ClassName = 'mt-4 mb-2 text-sm font-semibold text-navy-blue';
const pClassName = 'text-xs text-justify';

interface ContentProps {
	content: Content[];
}

export const LegalContent = ({ content }: ContentProps) => (
	<>
		{content.map((item, index) => (
			<React.Fragment key={index}>
				<h3 className={h3ClassName}>{item.title}</h3>
				{typeof item.text === 'string' ? (
					<p data-testid='parragraph' className={pClassName}>
						{item.text}
					</p>
				) : (
					<div className={pClassName}>{item.text}</div>
				)}
			</React.Fragment>
		))}
	</>
);

export const PrivacyPolicyContent = () => (
	<LegalContent content={privacyPolicyContent} />
);
export const TermsOfServiceContent = () => (
	<LegalContent content={termsOfServiceContent} />
);
