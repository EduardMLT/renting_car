import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.js';
import { Gallery, GalleryItem } from './ImageGallery.styled.js';

export const ImageGallery = ({ images }) => {
  return (
    <Gallery>
      {images.map(image => (
        <GalleryItem key={image.id}>
          <ImageGalleryItem image={image} />
        </GalleryItem>
      ))}
    </Gallery>
  );
};
