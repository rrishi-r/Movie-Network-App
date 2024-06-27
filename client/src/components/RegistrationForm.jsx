import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username:'',
        password:'',
        email:'',
        favoriteGenres:[],
        favoriteActors:[],
        preferredLanguage:[],
        preferredNews:[],
    });
    const [userExists, setUserExists] = useState(false);
    
    const handleChange = (e) => {                                            
        const {name, value, options} = e.target;
        if(e.target.multiple){
            const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value)
            setFormData({...formData, [name]: selectedOptions});
        }
        else{
            setFormData({...formData, [name]: value})
        }
    }                                                                   
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/register', formData);
        console.log(response.data.userFound);
        if(response.data.userFound === 'true'){
            console.log("User exists");
            setUserExists(true);
        }
        else{
            console.log("User does not exist");
            navigate('/LoginForm');
        }
    }
    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-sky-900 to-indigo-600 items-center justify-center"> 
            <h1 className="text-6xl font-bold text-center text-white mb-8">Sign Up</h1>
            <div className="flex items-center justify-center space-x-10"> 
                <form className="border-4 border-white p-4"> 
                    <div>
                        <label for="first_name" className="text-sm font-medium text-white mb-2">First name</label>
                        <input type="text" name="firstName" value = {formData.firstName} onChange = {handleChange} id="first_name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2" required />
                    </div>
                    <div>
                        <label for="last_name" className="text-sm font-medium text-white mb-2">Last name</label>
                        <input type="text" name="lastName" value = {formData.lastName} onChange = {handleChange} id="last_name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2" required />
                    </div>
                    <div>
                        <label for="email" className="text-sm font-medium text-white mb-2">Email</label>
                        <input type="email" name="email" value = {formData.email} onChange = {handleChange} id="email" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2" required />
                    </div>
                    <div>
                        <label for="username" className="text-sm font-medium text-white mb-2">Username</label>
                        <input type="text" name="username" value = {formData.username} onChange = {handleChange} id="username" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2" required />
                    </div>
                    <div>
                        <label for="password" className="text-sm font-medium text-white mb-2">Password</label>
                        <input type="password" name="password" value = {formData.password} onChange = {handleChange} id="password" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm mb-2" required />
                    </div>
                </form>
                <form className="border-4 border-white p-4 w-full max-w-lg"> 
                    <div className="flex flex-wrap items-center"> 
                        <div className="mb-4 w-1/2 p-2"> 
                            <label for="genres_multiple" className="text-sm font-medium text-white">Favorite Movie Genres</label>
                            <select style={{ width: '100%' }} 
                            multiple id="genre_multiple" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mb-2"
                            onChange={handleChange}
                            name="favoriteGenres"
                            value={formData.favoriteGenres}>
                                <option selected>Favorite Movie Genres</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Horror">Horror</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Science Fiction">Science Fiction</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Animation">Animation</option>
                            </select>
                        </div>
                        <div className="mb-4 w-1/2 p-2">
                            <label for="actors_multiple" className="text-sm font-medium text-white">Favorite Movie Actors</label>
                            <select style={{ width: '100%' }} 
                            multiple id="actors_multiple" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mb-2"
                            onChange={handleChange}
                            name="favoriteActors"
                            value={formData.favoriteActors}>
                                <option selected>Favorite Movie Actors</option>
                                <option value="Tom Cruise">Tom Cruise</option>
                                <option value="Denzel Washington">Denzel Washington</option>
                                <option value="Brad Pitt">Brad Pitt</option>
                                <option value="Jennifer Lawrence">Jennifer Lawrence</option>
                                <option value="Margot Robbie">Margot Robbie</option>
                                <option value="Will Smith">Will Smith</option>
                                <option value="Chris Pratt">Chris Pratt</option>
                                <option value="Robert Downey Jr.">Robert Downey Jr.</option>
                                <option value="Zendaya">Zendaya</option>
                                <option value="Morgan Freeman">Morgan Freeman</option>
                                <option value="Leonardo DiCaprio">Leonardo DiCaprio</option>
                                <option value="Dwayne Johnson">Dwayne Johnson</option>
                                <option value="Jennifer Aniston">Jennifer Aniston</option>
                                <option value="Sandra Bullock">Sandra Bullock</option>
                                <option value="Emily Blunt">Emily Blunt</option>
                                <option value="Natalie Portman">Natalie Portman</option>
                                <option value="Anne Hathaway">Anne Hathaway</option>
                                <option value="Mahesh Babu">Mahesh Babu</option>
                                <option value="Prabhas">Prabhas</option>
                                <option value="Siddharth Malhotra">Siddharth Malhotra</option>
                                <option value="Varun Dhawan">Varun Dhawan</option>
                                <option value="Allu Arjun">Allu Arjun</option>
                                <option value="Ranbir Kapoor">Ranbir Kapoor</option>
                                <option value="Ranveer Singh">Ranveer Singh</option>
                                <option value="Alia Bhatt">Alia Bhatt</option>
                            </select>
                        </div>
                        <div className="mb-4 w-1/2 p-2">
                            <label for="languages_multiple" className="text-sm font-medium text-white">Preferred Languages</label>
                            <select style={{ width: '100%' }} 
                            multiple id="languages_multiple" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mb-2"
                            onChange={handleChange}
                            name="preferredLanguage"
                            value={formData.preferredLanguage}>
                                <option selected>Preferred Languages</option>
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                                <option value="German">German</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Tamil">Tamil</option>
                                <option value="Telegu">Telegu</option>
                                <option value="French">French</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Italian">Italian</option>
                            </select>
                        </div>
                        <div className="mb-4 w-1/2 p-2">
                            <label for="news_multiple" className="text-sm font-medium text-white">Preferred News</label>
                            <select style={{ width: '100%' }} 
                            multiple id="news_multiple" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mb-2"
                            onChange={handleChange}
                            name="preferredNews"
                            value={formData.preferredNews}>
                                <option selected>Preferred News</option>
                                <option value="New Releases">New Releases</option>
                                <option value="Reviews">Reviews</option>
                                <option value="Actor News">Actor News</option>
                                <option value="Top Hits">Top Hits</option>
                                <option value="Award Winners">Award Winners</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <button className="mb-3 mt-10 bg-blue-700 border border-blue hover:bg-blue-400 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
                Sign Up
            </button>
            {userExists ? <p className="text-red-600 text-center"> Username already exists. </p> : null}
        </div>
    );
}

export default RegistrationForm;