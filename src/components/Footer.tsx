import { useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { Modal, ContentModal, PrivacyPolicyContent, TermsOfServiceContent } from '@/components';

const ModalContentTypes = ['privacy', 'terms', null] as const;
type ModalContentType = typeof ModalContentTypes[number];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentType, setModalContentType] = useState<ModalContentType>(null);

  const handleModal = (contentType: ModalContentType) => {
    setIsModalOpen(!isModalOpen);
    setModalContentType(contentType);
  };

  return (
    <>
      <footer className='w-full py-2 select-none bg-navy-blue text-light-gray'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col items-center md:flex-row md:justify-between'>
            <div className='text-center md:text-left'>
              <span className='font-semibold font-roboto'>© {currentYear} QuiroJairoTerapia</span>
            </div>
            <div className='flex justify-center mt-4 space-x-3 text-xs md:text-sm md:space-x-0 md:space-y-2 md:mt-0 md:flex-col md:justify-start'>
              <button className='flex items-center space-x-1 font-sans' onClick={() => handleModal('privacy')}>
                <FaRegFileAlt />
                <span>Política de Privacidad</span>
              </button>

              <button className='flex items-center space-x-1 font-sans' onClick={() => handleModal('terms')}>
                <FaRegFileAlt />
                <span>Términos de Servicio</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
      <Modal isOpen={isModalOpen} onClose={() => handleModal(null)}>
        {modalContentType === 'privacy' && (
          <ContentModal title='Política de Privacidad' content={<PrivacyPolicyContent />} />
        )}
        {modalContentType === 'terms' && (
          <ContentModal title='Términos de Servicio' content={<TermsOfServiceContent />} />
        )}
      </Modal>
    </>
  );
};
