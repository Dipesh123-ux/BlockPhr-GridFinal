import React from 'react'
import BackgroundImage from './assests/hero-image.png'
import Image from 'next/image'
const Landing = ({connectWallet}) => {
    return (
        <div id="container" className="flex flex-col md:flex-row h-screen">
            {/* Left side */}
            <div className="sm:flex-1 flex flex-col justify-center items-center bg-cover bg-center text-white p-4 sm:p-8">
                <h1 className="text-2xl sm:text-4xl font-bold mb-2 ">Electronic Health Records</h1>
                <p className="text-xl m-5" >Store your health records in blockchain with more security!</p>
                <button onClick={()=>connectWallet()} className="px-4 py-2 sm:px-6 sm:py-3 border hover:bg-blue-500 text-white rounded">
                    Connect Wallet
                </button>
            </div>

            {/* Right side */}
            <div className="sm:flex-1">
                <Image
                    src={BackgroundImage}
                    alt="Background SVG"
                    className="h-1/2 w-full object-cover md:top-32 md:right-20 relative"
                />
            </div>
        </div>
    );
};

export default Landing