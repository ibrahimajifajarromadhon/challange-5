import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      padding: '20px',
      left: '0',
      bottom: '0',
      width: '100%',
    }}>
      &copy; {new Date().getFullYear()} MovieList
    </footer>
  );
};

export default Footer;
