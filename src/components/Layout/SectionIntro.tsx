interface SectionIntroProps {
  title: string;
  description: string;
}

export const SectionIntro = ({ title, description }: SectionIntroProps) => {
  return (
    <>
      <h2 className='mb-1 text-2xl font-extrabold md:text-3xl text-light-gray font-roboto text-shadow'>{title}</h2>
      <p className='mb-4 font-sans text-sm md:text-base text-light-gray text-shadow'>{description}</p>
    </>
  );
};
