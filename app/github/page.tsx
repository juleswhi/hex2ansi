"use client"
import React, { useEffect } from 'react';

const RedirectGithub = () => {
    useEffect(() => {
        const url = "https://github.com/juleswhi";
        window.location.href = url;

    }, []);
    return (

        <div>
            <p>
                redirecting to github...
            </p>
        </div>
    );
};

export default RedirectGithub;
