
import React, { useState, useEffect, useRef } from 'react'
import './App.css'

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isVisible, setIsVisible] = useState({})
  const heroRef = useRef(null)
  const portfolioRef = useRef(null)
  const audioRef = useRef(null)

  const playShutterSound = () => {
    // Create audio context for shutter sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (e) {
      console.log('Audio context not available')
    }
  }

  const handleCameraEffect = () => {
    const flash = document.querySelector('.camera-flash')
    if (flash) {
      flash.classList.add('flash')
      playShutterSound()
      setTimeout(() => flash.classList.remove('flash'), 500)
    }
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id
          setIsVisible(prev => ({ ...prev, [id]: true }))
          
          if (id === 'portfolio-section') {
            setTimeout(handleCameraEffect, 800)
          }
        }
      })
    }, observerOptions)

    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const portfolioItems = [
    { title: 'Golden Hour Ceremony', category: 'Ceremony', gradient: 'linear-gradient(135deg, #ff9a56, #fad0c4)' },
    { title: 'Bridal Portrait', category: 'Portraits', gradient: 'linear-gradient(135deg, #a8caba, #5d4e75)' },
    { title: 'Reception Details', category: 'Details', gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { title: 'First Dance', category: 'Reception', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { title: 'Wedding Rings', category: 'Details', gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { title: 'Couple Portrait', category: 'Portraits', gradient: 'linear-gradient(135deg, #fa709a, #fee140)' }
  ]

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <div className="App">
      {/* Hero Section */}
      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-video-bg">
          <div className="video-overlay"></div>
          <div className="floating-particles"></div>
          <div className="film-grain"></div>
        </div>
        
        <div className="hero-content">
          <div className="camera-breathe">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
              <circle cx="12" cy="13" r="3"/>
            </svg>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Your Love,</span>
            <span className="title-line title-emphasis">Captured in Light</span>
          </h1>
          
          <p className="hero-subtitle">Timeless Wedding Photography & Cinematography</p>
          
          <button 
            className={`music-toggle ${musicPlaying ? 'playing' : ''}`}
            onClick={() => setMusicPlaying(!musicPlaying)}
            aria-label="Toggle ambient music"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              {musicPlaying ? (
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              ) : (
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              )}
            </svg>
          </button>
        </div>
        
        <div className="scroll-indicator">
          <div className="sunbeam"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`about-section ${isVisible.about ? 'visible' : ''}`}>
        <div className="container">
          <div className="about-content">
            <div className="polaroid-reveal">
              <div className="polaroid-frame">
                <div className="photographer-image">
                  <span>Professional Portrait</span>
                </div>
                <div className="polaroid-caption">Capturing emotions since 2015</div>
              </div>
            </div>
            
            <div className="about-text">
              <h2>The Art of Storytelling</h2>
              <p>Every wedding tells a unique story of love, and I'm here to capture those fleeting moments that become lifelong memories. With over 8 years of experience, I specialize in creating timeless imagery that reflects the authentic emotions of your special day.</p>
              <div className="film-developing">
                <div className="developing-bar"></div>
                <span>Developing memories...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section with Camera Effect */}
      <section id="portfolio-section" className={`portfolio-section ${isVisible['portfolio-section'] ? 'visible' : ''}`}>
        <div className="camera-flash"></div>
        <div className="floating-camera">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
          </svg>
        </div>
        
        <div className="container">
          <h2 className="section-title">Portfolio Gallery</h2>
          
          <div className="gallery-filters">
            {['All', 'Ceremony', 'Portraits', 'Reception', 'Details'].map(filter => (
              <button 
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="photo-wall">
            {filteredItems.map((item, index) => (
              <div 
                key={index} 
                className="photo-frame"
                style={{ 
                  transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 1)}deg)`,
                  animationDelay: `${index * 0.2}s`
                }}
                onClick={playShutterSound}
              >
                <div className="photo-content" style={{ background: item.gradient }}>
                  <span>{item.title}</span>
                </div>
                <div className="photo-shadow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Timeline */}
      <section id="timeline" className={`timeline-section ${isVisible.timeline ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">A Day in Moments</h2>
          <div className="timeline-scroll">
            {[
              { title: 'Getting Ready', time: '10:00 AM', quote: 'The quiet anticipation before it all begins...', icon: '✨' },
              { title: 'First Look', time: '2:00 PM', quote: 'That moment when time stands still...', icon: '💫' },
              { title: 'Ceremony', time: '4:00 PM', quote: 'Sacred vows under endless skies...', icon: '🤍' },
              { title: 'Golden Hour', time: '6:30 PM', quote: 'Love illuminated by nature\'s spotlight...', icon: '🌅' },
              { title: 'Reception', time: '8:00 PM', quote: 'Joy and laughter filling the night...', icon: '✨' }
            ].map((moment, index) => (
              <div key={index} className="timeline-moment">
                <div className="moment-icon">{moment.icon}</div>
                <div className="moment-content">
                  <h3>{moment.title}</h3>
                  <time>{moment.time}</time>
                  <p className="moment-quote">"{moment.quote}"</p>
                </div>
                <div className="moment-image" style={{ 
                  background: `linear-gradient(135deg, ${index % 2 === 0 ? '#ff9a56, #fad0c4' : '#a8caba, #5d4e75'})` 
                }}>
                  <span>Memory Captured</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motion Memories */}
      <section id="motion" className={`motion-section ${isVisible.motion ? 'visible' : ''}`}>
        <div className="cinema-bg"></div>
        <div className="container">
          <h2 className="section-title">Motion Memories</h2>
          <p className="section-subtitle">Short films of forever</p>
          
          <div className="film-reel">
            {[
              'Highlight Reel', 
              'Ceremony Film', 
              'Reception Celebration'
            ].map((title, index) => (
              <div key={index} className="film-frame" onClick={playShutterSound}>
                <div className="film-sprockets">
                  <div className="sprocket"></div>
                  <div className="sprocket"></div>
                  <div className="sprocket"></div>
                </div>
                <div className="film-content" style={{
                  background: `linear-gradient(135deg, ${
                    index === 0 ? '#ff9a56, #fad0c4' :
                    index === 1 ? '#a8caba, #5d4e75' : '#f093fb, #f5576c'
                  })`
                }}>
                  <div className="play-button">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <span>{title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section id="behind-scenes" className={`behind-scenes ${isVisible['behind-scenes'] ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Behind the Lens</h2>
          <blockquote className="photographer-quote">
            "It's not just photos. It's a feeling I try to catch, frame by frame."
          </blockquote>
          
          <div className="bts-grid">
            {[
              { title: 'Preparation', desc: 'Every shot planned with intention and care' },
              { title: 'In the Moment', desc: 'Capturing authentic emotions as they unfold' },
              { title: 'Perfect Timing', desc: 'Years of experience in finding the right light' }
            ].map((item, index) => (
              <div key={index} className="bts-card" onClick={playShutterSound}>
                <div className="lens-flare"></div>
                <div className="bts-image" style={{
                  background: `linear-gradient(135deg, ${
                    index === 0 ? '#ff9a56, #fad0c4' :
                    index === 1 ? '#a8caba, #5d4e75' : '#f093fb, #f5576c'
                  })`
                }}>
                  <span>{item.title}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Golden Hour Gallery */}
      <section id="golden-gallery" className="golden-gallery">
        <div className="carousel-container">
          <div className="golden-carousel">
            {Array.from({length: 8}, (_, i) => (
              <div key={i} className="golden-frame">
                <div className="shutter-transition"></div>
                <div className="golden-image" style={{
                  background: `linear-gradient(135deg, ${
                    ['#ff9a56, #fad0c4', '#a8caba, #5d4e75', '#f093fb, #f5576c', '#4facfe, #00f2fe'][i % 4]
                  })`
                }}>
                  <span>Golden Moment {i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`pricing-section ${isVisible.pricing ? 'visible' : ''}`}>
        <div className="container">
          <h2 className="section-title">Investment in Forever</h2>
          <div className="pricing-grid">
            {[
              { 
                name: 'Essential', 
                price: '$2,500', 
                features: ['6 Hours Coverage', 'Digital Gallery', 'Print Release', 'Engagement Session'] 
              },
              { 
                name: 'Complete', 
                price: '$4,200', 
                features: ['Full Day Coverage', 'Second Photographer', 'Highlight Film', 'Premium Album', 'Engagement Session'] 
              },
              { 
                name: 'Luxury', 
                price: '$6,800', 
                features: ['Multi-Day Coverage', 'Cinematic Films', 'Premium Albums', 'Fine Art Prints', 'Drone Photography'] 
              }
            ].map((pkg, index) => (
              <div key={index} className="pricing-card">
                <div className="invitation-fold"></div>
                <h3>{pkg.name}</h3>
                <div className="price">{pkg.price}</div>
                <ul>
                  {pkg.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button className="cta-button">Inquire Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="film-strip-bg"></div>
        <div className="container">
          <div className="footer-content">
            <h3>Captured in Light</h3>
            <p>Creating timeless memories through the art of photography</p>
            
            <div className="social-lenses">
              {['Instagram', 'Portfolio', 'Contact'].map((social, index) => (
                <div key={index} className="lens-icon">
                  <span>{social}</span>
                </div>
              ))}
            </div>
            
            <div className="photo-credits">
              <span>© 2024 Captured in Light Photography</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
