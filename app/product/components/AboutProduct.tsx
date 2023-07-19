import React from 'react';

interface SectionTitleProps {
    title: string;
    isActive: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, isActive }) => {
    return (
        <div className="relative">
            <h2
                className={`m-2 font-semibold text-sm text-gray-60' ${
                    isActive ? 'font-bold' : 'font-normal'
                }`}
            >
                {title}
            </h2>
            {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600"></div>
            )}
        </div>
    );
};
interface Props {
    highlights: string[];
    description: string[];
}
const AboutProduct: React.FC<Props> = ({ highlights, description }) => {
    return (
        <div className="bg-gray-100 sm:col-span-5 row-start-3 sm:row-start-2 sm:row-span-2 sm:mt-2">
            <h1 className="font-bold text-lg text-center m-2">
                About This Item
            </h1>
            <div className="flex justify-center">
                <div className="flex items-center">
                    <SectionTitle title="Details" isActive={true} />
                    <SectionTitle title="Shipping & Returns" isActive={false} />
                    <SectionTitle title="Q&A" isActive={false} />
                </div>
            </div>
            <div className="h-[0.5px] bg-black w-full"></div>
            <div className="p-4">
                <div className="bg-white  p-4">
                    <h2 className="font-semibold text-sm mb-2">Highlights</h2>
                    <ul className="list-disc list-inside">
                        {highlights.map((highlight, index) => (
                            <li key={index} className="text-[10px]">
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="p-4 pt-0 ">
                <div className="bg-white  p-4">
                    <h2 className="font-semibold text-sm mb-2">Description</h2>
                    <p className="text-[10px]">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutProduct;
