import React from 'react';

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/images/error.jpg'} alt='error'></img>
            <span>Something went wrong</span>
        </>
    )
} 

export default ErrorMessage;