
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
          <p className="hero-subtitle">Romantic Wedding Stories Told in Still & Motion</p>
          <button 
            className={`music-toggle ${musicPlaying ? 'playing' : ''}`}
            onClick={() => setMusicPlaying(!musicPlaying)}
          >
            ♪
          </button>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Camera Section */}
      <section className={`camera-section ${currentSection >= 1 ? 'active' : ''}`} ref={cameraRef}>
        <div className={`camera-flash ${cameraClicked ? 'flash' : ''}`}></div>
        <div className="camera-container">
          <div className={`camera-icon ${cameraClicked ? 'clicked' : ''}`} onClick={handleCameraClick}>
            📷
          </div>
          <h2>Every Moment is a Shot Worth Taking</h2>
          <div className="say-cheese">Say Cheese! 📸</div>
        </div>
        <div className="hero-images">
          <div className="image-card">
            <div className="placeholder-image sunset1">🌅</div>
          </div>
          <div className="image-card">
            <div className="placeholder-image sunset2">💑</div>
          </div>
          <div className="image-card">
            <div className="placeholder-image sunset3">💍</div>
          </div>
        </div>
      </section>

      {/* Gallery Wall */}
      <section className="gallery-wall">
        <h2>Couples Gallery</h2>
        <div className="gallery-filters">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Classic</button>
          <button className="filter-btn">Boho</button>
          <button className="filter-btn">Luxury</button>
          <button className="filter-btn">Sunset</button>
        </div>
        <div className="masonry-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="gallery-item" onClick={playShutterSound}>
              <div className={`placeholder-image gallery-${i}`}>
                {['👰', '🤵', '💐', '🥂', '💒', '🎊'][i-1]}
              </div>
              <div className="gallery-overlay">
                <span>View Story</span>
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
            { emoji: '☀️', title: 'Golden Hour Prep', desc: 'The quiet before the magic begins...' },
            { emoji: '💒', title: 'Sacred Vows', desc: 'Promises whispered in golden light...' },
            { emoji: '🎉', title: 'First Dance', desc: 'Hearts dancing as one...' },
            { emoji: '🌅', title: 'Sunset Portraits', desc: 'Love painted in amber hues...' }
          ].map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-icon">{item.emoji}</div>
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
        <h2>Motion Memories</h2>
        <div className="film-strip">
          {[1,2,3].map(i => (
            <div key={i} className="film-frame" onClick={playShutterSound}>
              <div className={`video-placeholder film-${i}`}>
                🎬
              </div>
              <div className="film-overlay">
                <span>▶ Play Film</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="behind-scenes">
        <h2>Moments Behind the Lens</h2>
        <p className="quote">"It's not just light I capture—it's emotion frozen in time."</p>
        <div className="polaroid-grid">
          {[
            { emoji: '📸', desc: 'Adjusting the perfect shot' },
            { emoji: '🔆', desc: 'Chasing golden hour' },
            { emoji: '💫', desc: 'Creating magic moments' }
          ].map((item, index) => (
            <div key={index} className="polaroid" onClick={playShutterSound}>
              <div className="polaroid-image">{item.emoji}</div>
              <div className="polaroid-caption">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Golden Hour Carousel */}
      <section className="golden-carousel">
        <div className="carousel-container">
          <div className="carousel-track">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="carousel-slide">
                <div className={`carousel-image golden-${i}`}>
                  🌇
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
          <p>Est. 2014 | Based in Paradise | Serving Couples Worldwide</p>
          <div className="social-links">
            <span>📧</span>
            <span>📱</span>
            <span>📸</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
