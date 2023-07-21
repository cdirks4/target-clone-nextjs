import React, { FC } from 'react';

interface StarProps {
    fill?: string;
}

const Star: FC<StarProps> = ({ fill }) => (
    <svg
        aria-hidden="true"
        className={`w-4 h-4 ${fill}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            stroke="currentColor"
            cx="8.5"
            cy="8.5"
            r="6"
            fillOpacity=".8"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        ></path>
    </svg>
);

const HalfStar: React.FC<StarProps> = ({}) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className={`w-4 h-4`}
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="half" x1="0" x2="1" y1=".5" y2=".5">
                <stop stopColor="#f6e05e" offset="50%" />
                <stop stopColor="#d1d5db" offset="50%" />
            </linearGradient>
        </defs>
        <path
            stroke="url(#half)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            fill="url(#half)"
        />
    </svg>
);

interface RatingStarsProps {
    rating: number;
}

const RatingStars: FC<RatingStarsProps> = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <div className="flex items-center rating rating-md">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={i} {...{ fill: 'text-yellow-400' }} />
            ))}
            {[...Array(halfStar)].map((_, i) => (
                <HalfStar key={i + halfStar} {...{}} />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <Star
                    key={i + fullStars + halfStar}
                    {...{ fill: 'text-gray-300' }}
                />
            ))}
        </div>
    );
};

export default RatingStars;
