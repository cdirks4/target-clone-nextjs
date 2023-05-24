'use client';
import React, { useState, FC } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    videos: string[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, videos }) => {
    const [mainImage, setMainImage] = useState<string>(images[0]);

    const handleClick = (image: string) => {
        setMainImage(image);
    };

    return (
        <div className="grid grid-cols-6 col-span-3 gap-2">
            <div className="col-span-5 relative hover:border-xs">
                {images.map((image, index) => (
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
                            width={500}
                            height={500}
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-rows-5 gap-2 row-start-1">
                {images.map((image, index) => {
                    return (
                        <React.Fragment key={`fragment-${index}`}>
                            <div
                                key={`bottom-images-div-${index}`}
                                className={`h-full w-full  ${
                                    image === mainImage && 'border-xs'
                                }`}
                                onClick={() => handleClick(image)}
                            >
                                <Image
                                    src={image}
                                    key={`bottom-images-${index}-${image}`}
                                    alt={`Image ${index + 1}`}
                                    width={500}
                                    height={500}
                                    className={`w-full h-full object-cover cursor-pointer ${
                                        image === mainImage && 'border-xs'
                                    }`}
                                />
                            </div>
                            {index == 1 && (
                                <video
                                    key={`video-${index}`}
                                    src={videos[0]}
                                    controls
                                    className="w-full h-full object-cover cursor-pointer"
                                ></video>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default ImageGallery;
