"use client"
import { BlogPosts } from 'app/components/posts'
import React, { useState } from 'react';

function hexToAnsi(hex: string): string {
    // Remove # if present
    hex = hex.replace('#', '');

    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
        return "ANSI here.."
    }

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // ANSI colors (standard 8-bit palette)
    const ansiColors = [
        // Standard colors
        { r: 0, g: 0, b: 0 },      // Black (0)
        { r: 205, g: 0, b: 0 },    // Red (1)
        { r: 0, g: 205, b: 0 },    // Green (2)
        { r: 205, g: 205, b: 0 },  // Yellow (3)
        { r: 0, g: 0, b: 238 },    // Blue (4)
        { r: 205, g: 0, b: 205 },  // Magenta (5)
        { r: 0, g: 205, b: 205 },  // Cyan (6)
        { r: 229, g: 229, b: 229 }, // White (7)
        // Bright colors
        { r: 127, g: 127, b: 127 }, // Bright Black (8)
        { r: 255, g: 0, b: 0 },     // Bright Red (9)
        { r: 0, g: 255, b: 0 },     // Bright Green (10)
        { r: 255, g: 255, b: 0 },   // Bright Yellow (11)
        { r: 92, g: 92, b: 255 },   // Bright Blue (12)
        { r: 255, g: 0, b: 255 },   // Bright Magenta (13)
        { r: 0, g: 255, b: 255 },   // Bright Cyan (14)
        { r: 255, g: 255, b: 255 }  // Bright White (15)
    ];

    // Calculate closest ANSI color using color distance
    let closestColor = 0;
    let minDistance = Number.MAX_VALUE;

    ansiColors.forEach((color, index) => {
        const distance = Math.sqrt(
            Math.pow(color.r - r, 2) +
            Math.pow(color.g - g, 2) +
            Math.pow(color.b - b, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestColor = index;
        }
    });

    return `\\x1b[38;5;${closestColor}m`;
}

const ColoredText: React.FC<{ text: string; hexColor: string }> = ({ text, hexColor }) => {
    return(
        <span className="font-mono text-base break-all">
        {`${hexColor}${text}`}
        </span>
    );
};

export default function Page() {
    const [inputValue, setInputValue] = useState('');
    const [res, setRes] = useState('ANSI here..');


    const handleChange = (event) => {
        setInputValue(event.target.value);
        setRes(hexToAnsi(event.target.value));
    };

    return (
        <section>
        <input
        type="text"
        id="textInput"
        value={inputValue}
        onChange={handleChange}
        placeholder="put hex in here.."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400 shadow-sm"
        />
        <p className="mb-2">
        </p>
        <div className="p-4 rounded-lg border border-gray-100 shadow-sm">
            <ColoredText text={res} hexColor="" />
        </div>
        </section>
    )
}
