import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';



const UserAccount = () => {
    const [formData, setFormData] = useState({
        favoriteGenres: [],
        favoriteActors: [],
        preferredLanguage: [],
        preferredNews: [],
    });
    
    const [slides, setSlides] = useState([]);
    const [header, setHeader] = useState("");
    const [fetchingNews, setFetchingNews] = useState(true);
    const findNews = async(data) => {
        const response = await axios.post('http://localhost:3001/generateNews', data);
        console.log(response.data);
        var slidesCopy = [];
        for(let i = 0; i < response.data.length; i++) {
            slidesCopy.push(
                <div key = {i} className="each-slide-effect bg-gradient-to-r from-sky-900 to-indigo-600 h-screen">
                    <div className="pt-5 mb-5 border-4 border-white p-5">  
                        <h2 className="text-center text-4xl font-bold text-white">{`${firstName}'s Newspage`}</h2>
                    </div>
                    <div className="flex justify-center text-3xl font-bold text-white mb-3 underline">
                        <span>{response.data[i][0]}</span>
                    </div>
                    <div className="text-white text-lg leading-loose">
                        <span>{response.data[i][1]}</span>
                    </div>
                </div>
            )
        }
        setSlides(slidesCopy);
        setFetchingNews(false);
    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    }
    const location = useLocation();
    const firstName = location.state.firstName;
    console.log(firstName);
    const favoriteGenres = location.state.favoriteGenres;
    console.log(favoriteGenres);
    const favoriteActors = location.state.favoriteActors;
    const preferredLanguage = location.state.preferredLanguage;
    const preferredNews = location.state.preferredNews;
    console.log("User Account Check");
    console.log(favoriteGenres);
    console.log(favoriteActors);
    console.log(preferredLanguage);
    console.log(preferredNews);
    useEffect(() => {
        const newFormData = {...formData, 
            favoriteGenres: favoriteGenres, 
            favoriteActors: favoriteActors, 
            preferredLanguage: preferredLanguage, 
            preferredNews: preferredNews
        };
        findNews(newFormData);

    }, [location]);

    //const headline = `"Variety and iHeartRadio Team Up for New Podcast: 'Variety Confidential'"`
    return(
        fetchingNews ? 
        <div className="bg-gradient-to-r from-sky-900 to-indigo-600 h-screen">
            <div className="flex justify-center items-center h-full"> 
                <img src="./LoadingText2.svg" alt="Loading Spinner" />
            </div>
        </div>
        :
        <div>
            <button style={{position: 'absolute', right: 10, top: 10, zIndex: 1}} className="bg-blue-700 border border-blue hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>
                Log Out
            </button>
            <Slide>
                {slides}
            </Slide>
        </div>
    )
    
}

export default UserAccount;