import { useState, useCallback, FC } from 'react';
import ImageViewer from 'react-simple-image-viewer';
import { StyledImageViewer } from './ImageViewer.style';

interface ViewImageProps {
  src: string;
  alt: string;
}

export const ViewImage: FC<ViewImageProps> = ({ src, alt }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [src];

  const openImageViewer = useCallback(
    (index: number) => () => {
      setCurrentImage(index);
      setIsViewerOpen(true);
    },
    []
  );

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div
      style={{
        cursor: 'pointer',
      }}
    >
      {images.map((src, index) => (
        <StyledImageViewer
          src={src}
          alt={alt}
          onClick={openImageViewer(index)}
          key={index}
        />
      ))}

      {isViewerOpen && (
        <div
          style={{
            zIndex: 4000,
          }}
        >
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
            backgroundStyle={{
              zIndex: 5000,
            }}
          />
        </div>
      )}
    </div>
  );
};
