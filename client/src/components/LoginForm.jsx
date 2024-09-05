import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toFormData } from 'axios';
import { useTransition } from 'react';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:'',
        password:'',
    })

    const handleChange = (e) => {
        const {name, value, options} = e.target;
        setFormData({...formData, [name]: value});
    }
    const[incorrectLogin, setIncorrectLogin] = useState(false);
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/login', formData);
        console.log("first name");
        console.log(response.data.firstName);
        console.log("favorite Genres");
        console.log(response.data.favoriteGenres);
        console.log("favorite Actors");
        console.log(response.data.favoriteActors);
        console.log("preferred language");
        console.log(response.data.preferredLanguage);
        console.log("preferred news");
        console.log(response.data.preferredNews);
        if(response.data.status_value === false){
            setIncorrectLogin(true);
        }
        else{
            navigate('/UserAccount', { state: { firstName: response.data.firstName,
                favoriteGenres: response.data.favoriteGenres, 
                favoriteActors: response.data.favoriteActors, 
                preferredLanguage: response.data.preferredLanguage,
                preferredNews: response.data.preferredNews} })
        }
    }
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-sky-900 to-indigo-600">
            <h1 className="text-6xl font-bold text-center text-white mb-8">Log In</h1> 
            <form className="border-4 border-white p-4">
                <div>
                    <label for="username" className="text-lg font-medium text-white mb-2"> Username </label>
                    <input type="text" name="username" id="username" onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-m mb-2"/>
                </div>
                <div>
                    <label for="password" className="text-lg font-medium text-white mb-2"> Password </label>
                    <input type="password" name="password" id="password" onChange={handleChange} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-m mb-2"/>
                </div>
            </form>
            <button className="mt-10 bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mb-3" type="button" onClick={handleSubmit}>
                Log in
            </button>
            {incorrectLogin ? <p className="text-red-600 text-center"> Incorrect username or password entered. </p> : null}
        </div>
    )
}

export default LoginForm;