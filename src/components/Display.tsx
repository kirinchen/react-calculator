import React from 'react';

interface DisplayProps {
    value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
    // This function adjusts the font size based on the length of the displayed text.
    const getFontSize = (text: string) => {
        const length = text.length;
        if (length > 18) return 'text-2xl';
        if (length > 14) return 'text-3xl';
        if (length > 10) return 'text-4xl';
        if (length > 7) return 'text-5xl';
        return 'text-6xl sm:text-7xl';
    };

    // Format the number to include commas, and handle the case where the user has typed a decimal point.
    const formatValue = () => {
        if (value.includes('e') || value === '-0') {
            return value;
        }

        const number = Number(value);
        if (isNaN(number)) {
            return 'Error';
        }
        
        const formatted = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 10,
        }).format(number);

        if (value.endsWith('.') && !formatted.includes('.')) {
            return formatted + '.';
        }

        return formatted;
    };
    
    const finalDisplayValue = formatValue();

    return (
        <div className="bg-black text-white w-full h-24 sm:h-28 flex items-end justify-end p-4 rounded-lg overflow-hidden">
            <h1 
              className={`font-light ${getFontSize(finalDisplayValue)} transition-all duration-200 text-right w-full break-all`}
              style={{ lineHeight: '1.2' }}
              aria-live="polite"
            >
                {finalDisplayValue}
            </h1>
        </div>
    );
};

export default Display;