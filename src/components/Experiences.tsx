import { Comments, Testimonial } from '@/components';
import { testimonials } from '@/data';

export const Experiencies = () => {
  return (
    <div className='container px-4 mx-auto select-none md:px-8 lg:px-16'>
      <h2 className='mb-4 text-3xl font-extrabold md:text-4xl text-light-gray font-roboto text-shadow'>
        Experiencias de QuiroJairoTerapia
      </h2>
      <p className='mb-4 font-sans text-base md:text-lg text-light-gray text-shadow'>
        QuiroJairoTerapia ha ayudado a muchas personas a encontrar alivio y bienestar. Estas son algunas de las
        experiencias de nuestros clientes:
      </p>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            {...testimonial}
            bgStyle={
              index % 2 === 0 ? 'bg-navy-blue hover:bg-navy-blue-lighter' : 'bg-turquoise hover:bg-turquoise-lighter'
            }
          />
        ))}
      </div>
      <Comments />
    </div>
  );
};
