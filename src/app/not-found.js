// "use client";
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-950 to-black text-white font-sans">
            <div className="bg-blue-950/50 px-6 py-10 sm:px-12 sm:py-14 rounded-2xl shadow-2xl text-center">
                <h1 className="text-6xl sm:text-7xl font-extrabold mb-4 tracking-widest">404</h1>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Page Not Found</h2>
                <p className="mb-6 text-lg sm:text-xl text-white/90">The page you are looking for does not exist or has been moved.</p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-white text-purple-700 rounded-lg font-bold shadow-md hover:bg-purple-700 hover:text-white transition-colors duration-200"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}