import React, { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import '../styles/ScrollToTop.css';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300); // show after 300px scroll
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <div className="scroll-to-top">
      <FaArrowCircleUp
        className={`scroll-icon ${visible ? 'show' : ''}`}
        onClick={scrollToTop}
        title="Back to Top"
      />
    </div>
  );
};

export default ScrollToTop;
