import React from 'react';
import signInGoogleIcon from '../assets/signInGoogleIcon.png'; 
import journeyIcon from '../assets/journeyIcon.png'; 

function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-500 text-white p-10 flex flex-col justify-center items-start">
        <h1 className="text-4xl font-bold mb-4">Aspire</h1>
        <p className="text-xl font-medium mb-10">
          Inspire Growth, <br /> Achieve More
        </p>
        <div className="mt-5 w-full">
          <img src={journeyIcon} alt="Journey Icon" className='w-full object-contain'/> 
        </div>
      </div>
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-2 text-black">Welcome Back!</h2>
        <p className="text-black mb-6">Continue with Google or enter your details</p>
        
        <button className="w-full h-12 flex justify-center items-center mb-6">
          <img src={signInGoogleIcon} alt="Google Icon" className="h-full object-contain" />
        </button>
        
        <form className="w-full flex flex-col">
          <label htmlFor="username" className="text-sm mb-1 text-black">Username</label>
          <input
            type="email"
            id="username"
            placeholder="example@gmail.com"
            className="text-black p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <label htmlFor="password" className="text-sm text-black mb-1">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="text-black p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <button
            type="submit"
            className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        
        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account? <a href="signup" className="text-blue-500 font-bold">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
