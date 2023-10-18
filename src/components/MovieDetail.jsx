import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlayCircle, FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const detailsApiUrl = `${import.meta.env.VITE_API}/v1/movie/${id}`;

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get(detailsApiUrl, config)
      .then(response => {
        setMovieData(response.data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [id]);

  if (!movieData) {
    return <p>Loading...</p>;
  }

  const backgroundImageUrl = `https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`;

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '999',
  };

  const containerStyle = {
    display: 'flex',
    color: 'white',
    marginTop: '200px',
    minHeight: '100vh',
  };

  return (
    <div className="Movie-detail" style={backgroundStyle}>
      <div className="container" style={containerStyle}>
        <div className="Movie-detail-content">
          <h1 className='Movie-detail-judul' style={{ marginBottom: "30px" }}>{movieData.title}</h1>
          <p>Genres: {movieData.genres.map(genre => genre.name).join(', ')}</p>
          <p>Tanggal Rilis: {movieData.release_date}</p>
          <p><FaStar style={{ color: 'gold', marginLeft: '0px', marginBottom: "5px" }} /> {movieData.vote_average} / 10</p>
          <p>{movieData.overview}</p>
          <a href="#" className="Movie-btn" style={{ marginLeft: "0px" }}>
            <FaPlayCircle style={{ marginRight: '5px', marginBottom: '20px', marginTop: "15px" }} />
            WATCH TRAILER
          </a>
          <Link to={'/'}><button type="button" className="Movie-back">BACK TO HOME</button></Link>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;