import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import CarouselSlider from '../components/CarouselSlider';
import Footer from '../components/Footer';
import { FaArrowRight } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import Header from '../components/Header'; 


const Home = () => {
    const [data, setData] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        const apiUrl = `${import.meta.env.VITE_API}/v1/movie/popular`;
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get(apiUrl, config)
            .then(response => {
                setData(response.data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


    const handleSearch = (searchTerm) => {
        const searchApiUrl = `${import.meta.env.VITE_API}/v1/search/movie?page=1&query=${searchTerm}`;

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get(searchApiUrl, config)
            .then(response => {
                setSearchResults(response.data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div >
            <Header onSearch={handleSearch} />
            <CarouselSlider />
            {/* <SearchBar onSearch={handleSearch} /> */}
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <h5 style={{ textAlign: "center", margin: "50px", color: "red" }}>
                        Daftar Film Kosong. Silakan Login Atau Register Untuk Melihat Daftar Film.
                    </h5>
                </div>) : (
                <div className="Movie-content" style={{ marginBottom: "80px" }}>
                    <h2 className='Movie-popular' style={{ marginLeft: "15px" }}>Popular Movie</h2>
                    <a href='#' className='Movie-more' style={{ marginRight: "10px", float: "right" }}>See All Movie<FaArrowRight className='Movie-arrowRight' /></a>

                    {searchResults.length > 0 ? (
                        <div className='Movie-container'>
                            {searchResults.map((item) => (
                                <div className='Movie-wrapper' key={item.id}>
                                    <Link to={`/movie/${item.id}`} >
                                        <img
                                            className='Movie-image'
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            alt={item.title}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : data.length > 0 ? (
                        <div className='Movie-container'>
                            {data.map((item) => (
                                <div className='Movie-wrapper' key={item.id}>
                                    <Link to={`/movie/${item.id}`} >
                                        <img
                                            className='Movie-image'
                                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            alt={item.title}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
            )}
            <Footer />
        </div>
    );
}

export default Home;
