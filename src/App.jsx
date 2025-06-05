
import React, { useState, useEffect, useRef } from 'react'
import './App.css'

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [cameraClicked, setCameraClicked] = useState(false)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const heroRef = useRef(null)
  const cameraRef = useRef(null)
  const audioRef = useRef(null)

  const playShutterSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
    }
  }

  const handleCameraClick = () => {
    setCameraClicked(true)
    playShutterSound()
    setTimeout(() => setCameraClicked(false), 1000)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newSection = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(newSection)

      // Trigger camera effect when scrolling to camera section
      if (newSection === 1 && !cameraClicked) {
        setTimeout(() => {
          handleCameraClick()
        }, 500)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cameraClicked])

  return (
    <div className="App">
      {/* Audio for shutter sound */}
      <audio ref={audioRef} preload="auto">
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmUfCCGH0fPTgjMGHm7A7+OZURE=" type="audio/wav" />
      </audio>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div className="floating-particles"></div>
          <div className="film-grain"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="captured">CAPTURED IN</span>
            <span className="light">LIGHT</span>
          </h1>
          <p className="hero-subtitle">Timeless Wedding Photography & Cinematography</p>
          <button 
            className={`music-toggle ${musicPlaying ? 'playing' : ''}`}
            onClick={() => setMusicPlaying(!musicPlaying)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Camera Section */}
      <section className={`camera-section ${currentSection >= 1 ? 'active' : ''}`} ref={cameraRef}>
        <div className={`camera-flash ${cameraClicked ? 'flash' : ''}`}></div>
        <div className="camera-container">
          <div className={`camera-icon ${cameraClicked ? 'clicked' : ''}`} onClick={handleCameraClick}>
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 15.2l3.536-3.536-1.414-1.414L12 12.372 9.879 10.25l-1.414 1.414L12 15.2zm0-6.4c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm8-1H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 14H4V10h16v12z"/>
            </svg>
          </div>
          <h2>Every Moment Deserves Perfection</h2>
          <div className="say-cheese">Professional Wedding Photography</div>
        </div>
        <div className="hero-images">
          <div className="image-card">
            <div className="placeholder-image sunset1">
              <span>Ceremony</span>
            </div>
          </div>
          <div className="image-card">
            <div className="placeholder-image sunset2">
              <span>Portraits</span>
            </div>
          </div>
          <div className="image-card">
            <div className="placeholder-image sunset3">
              <span>Reception</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Wall */}
      <section className="gallery-wall">
        <h2>Portfolio Gallery</h2>
        <div className="gallery-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Ceremony</button>
          <button className="filter-btn">Portraits</button>
          <button className="filter-btn">Reception</button>
          <button className="filter-btn">Details</button>
        </div>
        <div className="masonry-grid">
          {[
            'Bridal Portrait',
            'Exchange of Vows',
            'Wedding Rings',
            'First Dance',
            'Venue Details',
            'Celebration'
          ].map((title, i) => (
            <div key={i} className="gallery-item" onClick={playShutterSound}>
              <div className={`placeholder-image gallery-${i+1}`}>
                <span>{title}</span>
              </div>
              <div className="gallery-overlay">
                <span>View Collection</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <h2>Wedding Day Timeline</h2>
        <div className="timeline">
          {[
            { icon: '☀', title: 'Preparation', desc: 'Capturing the anticipation and preparation moments' },
            { icon: '♡', title: 'Ceremony', desc: 'Your sacred vows in timeless elegance' },
            { icon: '♪', title: 'Celebration', desc: 'Joy and laughter with family and friends' },
            { icon: '◐', title: 'Golden Hour', desc: 'Romantic portraits in perfect light' }
          ].map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-icon">{item.icon}</div>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motion Memories */}
      <section className="motion-section">
        <h2>Cinematic Films</h2>
        <div className="film-strip">
          {['Highlight Reel', 'Full Ceremony', 'Reception'].map((title, i) => (
            <div key={i} className="film-frame" onClick={playShutterSound}>
              <div className={`video-placeholder film-${i+1}`}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>{title}</span>
              </div>
              <div className="film-overlay">
                <span>▶ Watch Film</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="behind-scenes">
        <h2>Our Approach</h2>
        <p className="quote">"We capture not just moments, but the emotions that make them unforgettable."</p>
        <div className="polaroid-grid">
          {[
            { title: 'Pre-Wedding Consultation', desc: 'Understanding your vision and style' },
            { title: 'Professional Equipment', desc: 'State-of-the-art cameras and lighting' },
            { title: 'Expert Editing', desc: 'Meticulous post-production for perfection' }
          ].map((item, index) => (
            <div key={index} className="polaroid" onClick={playShutterSound}>
              <div className="polaroid-image">
                <span>{item.title}</span>
              </div>
              <div className="polaroid-caption">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Golden Hour Carousel */}
      <section className="golden-carousel">
        <div className="carousel-container">
          <div className="carousel-track">
            {['Golden Hour Portrait', 'Sunset Ceremony', 'Evening Reception', 'Romantic Moments', 'Venue Beauty', 'Celebration'].map((title, i) => (
              <div key={i} className="carousel-slide">
                <div className={`carousel-image golden-${i+1}`}>
                  <span>{title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Captured in Light</h3>
          <p>Professional Wedding Photography & Cinematography</p>
          <p>Serving couples worldwide with timeless elegance</p>
          <div className="social-links">
            <span>Contact</span>
            <span>Portfolio</span>
            <span>Instagram</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
