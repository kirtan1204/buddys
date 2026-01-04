// import React from 'react';
// import Slider from '../components/Slider';
// import '../styles/Home.css';
// import ScrollToTop from '../components/ScrollToTop';

// function Home() {
//   return (
//     <div className="home-page">
//       <Slider />

//       {/* Hero Section */}
//       <section className="home-hero animate-fade-in">
//         <div className="hero-container">
//           <div className="hero-text animate-slide-left">
//             <h1>BUDDY’S Vadapav</h1>
//             <p>Unwrap Joy. Bite into Tradition with a Modern Twist.</p>
//             <a href="/menu" className="cta-button animate-pulse">🚀 Explore Menu</a>
//           </div>
//           <div className="hero-image animate-slide-right">
//             <img src="/images/hero-vadapav.jpg" alt="Delicious Vadapav" />
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section animate-fade-in">
//         <h2 className="section-title">Why Choose Us?</h2>
//         <div className="features-grid">
//           <div className="feature-card animate-bounce-in">
//             <img src="/images/fresh-ingredients.jpg" alt="Fresh Ingredients" />
//             <h3>Fresh Ingredients</h3>
//             <p>We use the freshest pav, potato, and spices, sourced daily to ensure taste and safety.</p>
//           </div>
//           <div className="feature-card animate-bounce-in">
//             <img src="/images/hygiene.jpg" alt="Impeccable Hygiene" />
//             <h3>Impeccable Hygiene</h3>
//             <p>We follow top-tier hygiene standards — your health is our priority.</p>
//           </div>
//           <div className="feature-card animate-bounce-in">
//             <img src="/images/speed-service.jpg" alt="Lightning Fast Service" />
//             <h3>Lightning Fast</h3>
//             <p>Your cravings don’t wait. Neither do we. Get your order in minutes.</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bottom-cta animate-fade-in">
//         <h2>Craving something spicy?</h2>
//         <p>🔥 Your favorite Vadapav is just a click away.</p>
//         <a href="/menu" className="cta-button large animate-pulse">Order Now</a>
//       </section>

//       <ScrollToTop />
//     </div>
//   );
// }

// export default Home;



import React, { useEffect, useRef } from 'react';
import Slider from '../components/Slider';
import '../styles/Home.css';
import ScrollToTop from '../components/ScrollToTop';

function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    [heroRef, featuresRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <Slider />

      {/* Hero Section */}
      <section className="home-hero" ref={heroRef}>
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        
        <div className="hero-container">
          <div className="hero-text">
            <div className="hero-badge">🔥 Hot & Fresh</div>
            <h1>
              <span className="gradient-text">BUDDY'S</span>
              <br />
              <span className="highlight-text">Vadapav</span>
            </h1>
            <p className="hero-subtitle">
              Unwrap Joy. Bite into Tradition with a <span className="accent-text">Modern Twist</span>.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Varieties</span>
              </div>
              <div className="stat">
                <span className="stat-number">15min</span>
                <span className="stat-label">Fast Delivery</span>
              </div>
            </div>
            <div className="hero-actions">
              <a href="/menu" className="cta-button primary animate-float">
                <span className="button-content">
                  🚀 Explore Menu
                </span>
                <div className="button-shine"></div>
              </a>
              <a href="/about" className="cta-button secondary">
                Our Story
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="image-container">
              <img 
                src="/images/hero-vadapav.jpg" 
                alt="Delicious Vadapav" 
                className="hero-main-image"
              />
              <div className="floating-element element-1">🌶️</div>
              <div className="floating-element element-2">🍃</div>
              <div className="floating-element element-3">🔥</div>
            </div>
            <div className="hero-card">
              <div className="card-content">
                <div className="rating">⭐ 4.9/5</div>
                <p>"Best Vadapav in town! Never disappoints!"</p>
                <div className="customer">- Rajesh K.</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div> */}
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <div className="features-background">
          <div className="bg-pattern"></div>
        </div>
        
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Why <span className="gradient-text">Choose Us?</span>
            </h2>
            <p className="section-subtitle">
              Experience the difference that quality and passion make
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  🥔
                </div>
                <div className="icon-glow"></div>
              </div>
              <h3>Fresh Ingredients</h3>
              <p>We use the freshest pav, potato, and spices, sourced daily to ensure taste and safety.</p>
              <div className="feature-highlight"></div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  🧼
                </div>
                <div className="icon-glow"></div>
              </div>
              <h3>Impeccable Hygiene</h3>
              <p>We follow top-tier hygiene standards — your health is our priority.</p>
              <div className="feature-highlight"></div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  ⚡
                </div>
                <div className="icon-glow"></div>
              </div>
              <h3>Lightning Fast</h3>
              <p>Your cravings don't wait. Neither do we. Get your order in minutes.</p>
              <div className="feature-highlight"></div>
            </div>
            
            {/* <div className="feature-card">
              <div className="feature-icon">
                <div className="icon-wrapper">
                  💝
                </div>
                <div className="icon-glow"></div>
              </div>
              <h3>Made with Love</h3>
              <p>Every vadapav is crafted with care and traditional recipes.</p>
              <div className="feature-highlight"></div>
            </div> */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bottom-cta" ref={ctaRef}>
        <div className="cta-background">
          <div className="cta-glow"></div>
        </div>
        
        <div className="container">
          <div className="cta-content">
            <h2>
              Ready to satisfy your 
              <span className="gradient-text"> cravings?</span>
            </h2>
            <p className="cta-subtitle">
              🔥 Your favorite Vadapav is just a click away. Don't wait - treat yourself now!
            </p>
            
            <div className="cta-actions">
              <a href="/menu" className="cta-button large primary animate-pulse">
                <span className="button-content">
                  🍔 Order Now
                </span>
                <div className="button-sparkles">
                  <span>✨</span>
                  <span>✨</span>
                  <span>✨</span>
                </div>
              </a>
              
              <div className="cta-features">
                <div className="feature-tag">🚚 Free Delivery</div>
                <div className="feature-tag">⭐ 4.9 Rating</div>
                <div className="feature-tag">⚡ 15min Ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}

export default Home;