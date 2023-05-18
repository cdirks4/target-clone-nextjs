'use client';
import React, { useState, FC } from 'react';

interface ImageGalleryProps {
    images: string[];
    videos: string[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, videos }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    const handleClick = (image: string) => {
        setMainImage(image);
    };

    return (
        <div className="grid grid-cols-6  col-span-3 gap-2">
            <div className="col-span-5 relative ">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
                        className={`absolute  object-cover transition-opacity duration-500  ${
                            image === mainImage ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
            <div className="grid grid-rows-5 gap-2 row-start-1">
                {images.map((image, index) => {
                    return (
                        <>
                            <div
                                key={index}
                                className="h-full w-full"
                                onClick={() => handleClick(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover cursor-pointer hover:border-2  hover:border-dotted hover:border-gray-500"
                                />
                            </div>
                            {index == 1 && (
                                <video
                                    src={videos[0]}
                                    controls
                                    className="w-full h-full object-cover cursor-pointer"
                                ></video>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageGallery;
