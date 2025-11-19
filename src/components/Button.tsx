
import React from 'react';

export enum ButtonType {
    Number,
    Operator,
    Function
}

interface ButtonProps {
    label: string;
    type: ButtonType;
    onClick: () => void;
    wide?: boolean;
    isActive?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, type, onClick, wide = false, isActive = false }) => {
    const getButtonClasses = () => {
        let baseClasses = `
            w-full h-16 sm:h-20 text-2xl sm:text-3xl rounded-full 
            flex items-center justify-center 
            focus:outline-none transition-colors duration-200
        `;

        if (wide) {
            baseClasses += ' col-span-2 text-left pl-7';
        } else {
            baseClasses += ' aspect-square';
        }

        switch (type) {
            case ButtonType.Number:
                baseClasses += ' bg-[#333] text-white active:bg-[#777]';
                break;
            case ButtonType.Operator:
                 if (isActive) {
                    baseClasses += ' bg-white text-[#f1a33c]';
                } else {
                    baseClasses += ' bg-[#f1a33c] text-white active:bg-[#f1c37c]';
                }
                break;
            case ButtonType.Function:
                baseClasses += ' bg-[#a5a5a5] text-black active:bg-[#d5d5d5]';
                break;
        }
        return baseClasses;
    };
    
    return (
        <button className={getButtonClasses()} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
