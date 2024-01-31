import React from 'react';

const Footer = () => {

  const footerStyle = {
    marginTop: '490px'
  }
  return (
    <footer className="text-center py-2 footer-container" style={footerStyle}>
    <div className='pt-2'>
      <a href="https://facebook.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-facebook h5"></i>
      </a>
      <a href="https://twitter.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-twitter h5"></i>
      </a>
      <a href="https://instagram.com" className="text-dark mx-2" target="_blank" rel="noopener noreferrer">
        <i className="bi bi-instagram h5"></i>
      </a>
    </div>
      <p className="mb-1 mt-1 text-dark">&copy; 2024 TechTorget</p>
    </footer>
  );
};

export default Footer;
