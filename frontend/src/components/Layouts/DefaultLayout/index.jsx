import React from 'react';

const DefaultLayout = ({ children }) => {
    return (
        <div className="w-full h-full font-poppins overflow-hidden">
            {children}
        </div>
    )
}

export default DefaultLayout