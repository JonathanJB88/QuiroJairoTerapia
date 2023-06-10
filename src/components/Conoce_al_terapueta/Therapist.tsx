import Image from "next/image";
import { CTAButton } from "@/components";

const imageSizes =
  "(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1280px";

export const Therapist = () => {
  return (
    <div className="flex flex-col-reverse items-center justify-between p-6 select-none md:p-8 md:px-20 md:flex-row">
      <div className="mb-4 mr-6 md:mb-0">
        <h2 className="mb-1 text-2xl font-extrabold text-white text-shadow md:text-4xl font-roboto">
          ¡Hola!, soy Jairo Fajardo.
        </h2>
        <p className="my-1 font-sans text-xl text-white md:my-8 md:text-4xl text-shadow">
          Soy Quiromasajista con más de 5 años de experiencia. Mi enfoque se
          basa en combinar ciencia y arte en la quiropráctica para brindarte un
          servicio terapéutico único y altamente beneficioso. ¿Estás listo para
          mejorar tu bienestar?.
        </p>

        <CTAButton
          label="¡Reserva!"
          className="px-2 py-1 mt-4 font-sans text-xs font-semibold transition-all duration-200 ease-in-out rounded-md md:mt-10 md:text-lg text-navy-blue bg-turquoise hover:bg-opacity-80"
        />
      </div>

      <Image
        src="/images/jairo_quirojairoterapia_quiromasajista.jpeg"
        alt="Jairo Fajardo, quiromasajista"
        width={600}
        height={600}
        loading="lazy"
        sizes={imageSizes}
        className="mb-4 rounded-lg shadow-lg md:mb-0"
      />
    </div>
  );
};
