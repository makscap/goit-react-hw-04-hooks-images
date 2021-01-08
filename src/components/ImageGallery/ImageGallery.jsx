import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({ images }) {
  return (
    <ul className="ImageGallery">
      {images.map(({ webformatURL, tags, largeImageURL, id }) => (
        <ImageGalleryItem
          src={webformatURL}
          alt={tags}
          largeImageUrl={largeImageURL}
          key={id}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};