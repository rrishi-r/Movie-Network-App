import React from "react"
import { Link } from 'react-router-dom';
import { lazy } from "react";

const LandingPage = () => {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-r from-sky-900 to-indigo-600 text-white text-6xl font-bold shadow-lg rounded-lg">
        <h2 className='underline'>The Movie Network</h2>
        <p className="text-lg mt-5">Delivering the latest news in cinema to you!</p>
        <div className="flex flex-row space-x-10 mt-8">
          <Link to="/RegistrationForm">
            <button className="text-lg bg-white text-blue-500 py-2 px-4 rounded-md shadow-md hover:bg-blue-500 hover:text-white">
              Create Account
            </button>
          </Link>
          <Link to="/LoginForm">
            <button className="text-lg bg-white text-blue-500 py-2 px-4 rounded-md shadow-md hover:bg-blue-500 hover:text-white">
              Login
            </button>
          </Link>
        </div>
      </div>
    );
};

export default LandingPage;