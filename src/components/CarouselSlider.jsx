import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';
import '../App.css';

const CarouselSlider = () => {

        const [index, setIndex] = useState(0);
        const [movies, setMovies] = useState([]);
    
        useEffect(() => {
            const apiUrl = `${import.meta.env.VITE_API}/v1/movie/popular`;
            const token = localStorage.getItem('token');
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
    
            axios.get(apiUrl, config)
                .then(response => {
                    setMovies(response.data.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }, []);

        const handleSelect = (selectedIndex) => {
            setIndex(selectedIndex);
        };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} controls={false}>
            {movies && movies.length > 0 && movies.slice(1, 4).map((movie, idx) => (
                <Carousel.Item key={idx} >
                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="img" alt={`Movie ${idx}`} style={{ width: "100%"}} />
                    <Carousel.Caption className="Movie-caption" style={{ textAlign: "left", marginLeft: "-180px", width: "50%", marginBottom: "210px" }}>
                        <h1 className='Movie-judul'>{movie.title}</h1>
                        <p className='Movie-deskripsi'>{movie.overview}</p>
                        <a href="#" className="Movie-btn" style={{ maxWidth: '200px' }}> <FaPlayCircle style={{ marginRight: '5px', marginBottom: "2px" }} />WATCH TRAILER</a>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default CarouselSlider;
