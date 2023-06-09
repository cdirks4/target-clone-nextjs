'use client';
import React, { useState, FC } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    videos: string[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, videos }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(-1);
    const [isVideoPaused, setIsVideoPaused] = useState<boolean>(true);
    const maxImagesToShow = 4
    const [mainImage, setMainImage] = useState<string>(images[0]);

    const handleClick = (image: string) => {
        setMainImage(image);
    };
     const handleVideoPlay = (index: number) => {
    setCurrentVideoIndex(index);
    setIsVideoPaused(false);
  };

  const handleVideoPause = () => {
    setIsVideoPaused(true);
  };

    const renderTopImages = () => {
        return images.slice(0, maxImagesToShow).map((image, index) => (
            <div
                key={`top-images-div-${index}`}
                className={`absolute object-cover transition-opacity duration-500 ${
                    image === mainImage ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <Image
                    key={`top-images-${index}-${image}`}
                    src={image}
                    alt={`Image ${index + 1}`}
                    quality={100}
                    width={500}
                    height={500}
                />
            </div>
        ));
    };

 const renderBottomImages = () => {
  const remaining = images.length - maxImagesToShow;
  let renderedImages = [];

  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    if (index >  maxImagesToShow) {
    break;
}
    if (index === maxImagesToShow && remaining > 0) {
        console.log(index)
        console.log(images[index])

      renderedImages.push(
        <div
          key={`bottom-images-div-${index}`}
          className="h-full w-full relative"
        >
          <Image
            src={image}
            key={`bottom-images-${index}-${image}`}
            alt={`Image ${index + 1}`}
            quality={100}
            width={500}
            height={500}
            className="w-full h-full object-cover cursor-pointer"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
            <span className="text-white text-xs">
              +{remaining} more
            </span>
          </div>
        </div>
      );
    } else if (index === 2 && videos[0]) {
      renderedImages.push(
        <div
          key={`video-div`}
          className="h-full w-full relative"
          onMouseEnter={() => setCurrentVideoIndex(index)}
          onMouseLeave={() => setCurrentVideoIndex(-1)}
        >
          <video
            key={`video-${index}`}
            id={`video-${index}`}
            src={videos[0]}
            className="w-full h-full object-cover cursor-pointer"
            onPause={handleVideoPause}
            onPlay={() => handleVideoPlay(index)}
          ></video>
          {index === currentVideoIndex && (
            <div className="absolute inset-0 flex items-center justify-center">
              {isVideoPaused ? (
                <button
                  className="w-6 h-6 bg-white rounded-full opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
                  onClick={() => {
                    const video = document.getElementById(
                      `video-${index}`
                    ) as HTMLVideoElement;
                    if (video) {
                      video.play();
                    }
                  }}
                >
                  <svg
                    className="w-8 h-8 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  className="w-6 h-6 bg-white rounded-full opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
                  onClick={() => {
                    const video = document.getElementById(
                      `video-${index}`
                    ) as HTMLVideoElement;
                    if (video) {
                      video.pause();
                    }
                  }}
                >
                  <svg
                    className="w-8 h-8 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 12H6"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      );
    } else {
  renderedImages.push(
    <div
      key={`bottom-images-div-${index}`}
      className="h-full w-full relative"
    >
      <Image
        src={image}
        key={`bottom-images-${index}-${image}`}
        alt={`Image ${index + 1}`}
        quality={100}
        width={500}
        height={500}
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  );
}
}

return renderedImages;
};


    return (
        <div className="grid grid-cols-6 col-span-3 gap-2">
            <div className="col-span-5 relative hover:border">
                {renderTopImages()}
            </div>
            <div className="grid grid-rows-5 gap-2 row-start-1">
                {renderBottomImages()}               
            </div>
        </div>
    );
};

export default ImageGallery;
