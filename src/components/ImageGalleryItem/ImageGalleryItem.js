import { GalleryItemImage } from './ImageGalleryItem.styled';
import { ModalOpen } from '../ModalOpen/ModalOpen.js';
import { useState } from 'react';

export const ImageGalleryItem = ({
  image: { largeImageURL, webformatURL, tags },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={openModal} />

      <ModalOpen
        isOpen={isModalOpen}
        closeModal={closeModal}
        src={largeImageURL}
        tags={tags}
      />
    </>
  );
};
