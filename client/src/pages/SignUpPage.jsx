import React from 'react';
import signUpGoogleIcon from '../assets/signUpGoogleIcon.png'; 
import journeyIcon from '../assets/journeyIcon.png'; 

function SignupPage() {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-500 text-white p-10 flex flex-col justify-center items-start">
        <h1 className="text-4xl font-bold mb-4">Aspire</h1>
        <p className="text-xl font-medium mb-10">
          Join the Journey to <br /> Achieve More
        </p>
        <div className="mt-5 w-full">
          <img src={journeyIcon} alt="Journey Icon" className='w-full object-contain'/> 
        </div>
      </div>
      <div className="w-1/2 bg-white p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-2 text-black">Create Your Account</h2>
        <p className="text-black mb-6">Sign up with Google or enter your details</p>
        
        <button className="w-full h-12 flex justify-center items-center mb-6">
          <img src={signUpGoogleIcon} alt="Google Icon" className="h-full object-contain" />
        </button>
        
        <form className="w-full flex flex-col">
          <label htmlFor="email" className="text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <label htmlFor="password" className="text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <label htmlFor="confirmPassword" className="text-sm text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            className="p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <button
            type="submit"
            className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-sm text-gray-600">
          Already have an account? <a href="login" className="text-blue-500 font-bold">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
