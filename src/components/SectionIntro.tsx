interface SectionIntroProps {
  title: string;
  description: string;
}

export const SectionIntro = ({ title, description }: SectionIntroProps) => {
  return (
    <>
      <h2 className='mb-4 text-3xl font-extrabold md:text-4xl text-light-gray font-roboto text-shadow'>{title}</h2>
      <p className='mb-4 font-sans text-base md:text-lg text-light-gray text-shadow'>{description}</p>
    </>
  );
};
