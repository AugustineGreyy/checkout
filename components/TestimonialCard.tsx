import React from 'react';

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, avatarUrl }) => {
    return (
        <div className="mt-8 md:mt-12 bg-gray-800 p-6 rounded-xl">
            <blockquote className="text-gray-300">
                <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 text-gray-600">
                    <path d="M9.47368 18C7.36842 18 5.57895 17.25 4.10526 15.75C2.63158 14.25 1.89474 12.375 1.89474 10.125C1.89474 7.8 2.73684 5.625 4.42105 3.6L6.52632 5.175C5.47368 6.6 4.94737 7.95 4.94737 9.225C4.94737 9.9 5.07018 10.4625 5.31579 10.9125C5.5614 11.3625 5.85088 11.6625 6.18421 11.8125C6.51754 11.9625 6.87281 12.0375 7.25 12.0375H8.31579L9.47368 18ZM22.1053 18C20 18 18.2105 17.25 16.7368 15.75C15.2632 14.25 14.5263 12.375 14.5263 10.125C14.5263 7.8 15.3684 5.625 17.0526 3.6L19.1579 5.175C18.1053 6.6 17.5789 7.95 17.5789 9.225C17.5789 9.9 17.7018 10.4625 17.9474 10.9125C18.193 11.3625 18.4825 11.6625 18.8158 11.8125C19.1491 11.9625 19.5044 12.0375 19.8816 12.0375H20.9474L22.1053 18Z" fill="currentColor"/>
                </svg>
                <p className="text-base">"{quote}"</p>
            </blockquote>
            <figcaption className="flex items-center mt-6">
                <img className="w-12 h-12 rounded-full" src={avatarUrl} alt={author} />
                <div className="ml-4">
                    <div className="text-base font-bold text-light">{author}</div>
                    <div className="text-sm text-gray-400">{role}</div>
                </div>
            </figcaption>
        </div>
    );
};

export default TestimonialCard;
