'use client';
import React, { useState, FC, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    videos: string[];
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, videos }) => {
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(-1);
    const maxImagesToShow = 4;
    const [mainImage, setMainImage] = useState<string>(images[0]);

    const handleClick = (image: string) => {
        setMainImage(image);
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

            if (index > maxImagesToShow) {
                break;
            }
            if (index === maxImagesToShow && remaining > 0) {
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
                    <div className="h-full w-full relative">
                        <VideoPlayer videoUrl={videos[0]} />
                    </div>
                );
            } else {
                renderedImages.push(
                    <div
                        key={`bottom-images-div-${index}`}
                        className={`h-full w-full  ${
                            image === mainImage && 'border'
                        }`}
                        onClick={() => handleClick(image)}
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
interface VideoPlayerProps {
    videoUrl: string;
}

interface VideoPlayerProps {
    videoUrl: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({ videoUrl }) => {
    const [isPaused, setIsPaused] = useState<boolean>(true);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            if (isPaused && !video.paused) {
                video.pause();
            } else if (!isPaused && video.paused) {
                video.play();
            }
        }
    }, [isPaused]);

    const handleTogglePlay = () => {
        setIsPaused((prevState) => !prevState);
    };

    return (
        <div className="absolute inset-0">
            <video
                src={videoUrl}
                className="w-full h-full object-cover cursor-pointer hover:border"
                onPause={handleTogglePlay}
                onPlay={handleTogglePlay}
            ></video>
            <div className="h-full w-full absolute inset-0 flex items-center justify-center">
                <button
                    className={`flex items-center justify-center w-6 h-6 rounded-full transition-opacity duration-200 ${
                        isPaused
                            ? 'bg-gray-400 opacity-75'
                            : 'bg-gray-400 opacity-0 hover:opacity-75'
                    }`}
                    onClick={() => {
                        const video = document.querySelector('video');
                        if (video) {
                            if (isPaused && video.paused) {
                                video.play();
                            } else if (!isPaused && !video.paused) {
                                video.pause();
                            }
                        }
                    }}
                >
                    {isPaused ? (
                        <svg
                            className="w-10 h-10 text-gray-800 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.5 19.083V4.917L19.083 12z"
                            />
                        </svg>
                    ) : (
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
                                d="M6 4h4v16H6zm8 0h4v16h-4z"
                            />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};
