import {useEffect, useState} from "react";
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from "./moviecard";
import config from './config'; 

//const API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const API_URL = "https://api.themoviedb.org/3/";
const { apiKey } = config;

const options= {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${config.apiKey}`
    }
  };

const App = () => {
    
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}search/movie?query=${title}`, options)
        const data = await response.json()
        setMovies(data.results)
        const d = data.results
        if (d != null ) 
            console.log(d[0])
    }
 
    useEffect(()=>{
       searchMovies(searchTerm)
    }, [])
    //second param : dependency array [] -> if empty then effect is on first load
    // no second param -> effect is called continuously

    return (
        <div className="app">
            <h1> CineVerse </h1>

            <div className="search">

                <input placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <img src={SearchIcon}
                    alt="Search icon"
                    onClick={(e) => searchMovies(searchTerm) }
                />
            </div>
            
            {
                movies?.length > 0 
                ? (
                    <div className="container">
                        { movies.map( 
                            (movie) => (<MovieCard movie={movie}/>) 
                        )}
                    </div>
                ) 
                : searchTerm == '' ? (
                        <div className="empty">
                        </div>
                    ) : 
                    (
                        <div className="empty">
                            <h2>No matching movies found!</h2>
                        </div>
                    )

            }

            {/* <div className="container">
                <MovieCard movie={movies[2]}></MovieCard>
            </div> */}
        </div>

    );
}

export default App;


// const fetch = require('node-fetch');

// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTAxZjFhNzJlOGRmZDZjZDE5ZGYwMDZmODkwMGM1NiIsInN1YiI6IjY0OWJhMjU5YzM5MjY2MDBjODg4OTEwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1ZPpbJ4z_nzDorC2viiQeABJL2V5h7fpJIBfV36FI3k'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));


const movie1 = {
    "adult": false,
    "backdrop_path": "/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
    "genre_ids": [
        28,
        80,
        53
    ],
    "id": 385687,
    "original_language": "en",
    "original_title": "Fast X",
    "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
    "popularity": 4654.279,
    "poster_path": "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    "release_date": "2023-05-17",
    "title": "Fast X",
    "video": false,
    "vote_average": 7.3,
    "vote_count": 2093
};
