import React, { useState, useEffect, useRef } from 'react'
import './App.css'

export default function App() {
  const [currentSection, setCurrentSection] = useState(0)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isVisible, setIsVisible] = useState({})
  const [isNavVisible, setIsNavVisible] = useState(false)
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
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsNavVisible(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)

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

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const portfolioItems = [
    { title: 'Golden Hour Ceremony', category: 'Ceremony', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Bridal Portrait', category: 'Portraits', image: 'https://images.unsplash.com/photo-1594736797933-d0b22a5e8bf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Reception Details', category: 'Details', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'First Dance', category: 'Reception', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Wedding Rings', category: 'Details', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Couple Portrait', category: 'Portraits', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ]

  const filteredItems = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter)

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className={`navbar ${isNavVisible ? 'visible' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => scrollToSection('hero')}>
            <span>Captured in Light</span>
          </div>

          <div className="nav-links">
            <button onClick={() => scrollToSection('about')} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('portfolio-section')} className="nav-link">
              Portfolio
            </button>
            <button onClick={() => scrollToSection('timeline')} className="nav-link">
              Timeline
            </button>
            <button onClick={() => scrollToSection('motion')} className="nav-link">
              Films
            </button>
            <button onClick={() => scrollToSection('pricing')} className="nav-link">
              Pricing
            </button>
            <button onClick={() => scrollToSection('footer')} className="contact-btn">
              Contact
            </button>
          </div>
        </div>
      </nav>

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
                <div className="photographer-image" style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)'
                }}>
                  <div className="photographer-overlay">
                    <span>Professional Portrait</span>
                  </div>
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
              >
                <div className="photo-content" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="photo-overlay">
                    <span>{item.title}</span>
                  </div>
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
              { 
                title: 'Getting Ready', 
                time: '10:00 AM', 
                quote: 'The quiet anticipation before it all begins...', 
                details: 'Capturing the intimate moments of preparation, the nervous excitement, and the careful attention to every detail that makes your day perfect.'
              },
              { 
                title: 'First Look', 
                time: '2:00 PM', 
                quote: 'That moment when time stands still...', 
                details: 'The raw emotion and authentic connection when you see each other for the first time, creating memories that will last forever.'
              },
              { 
                title: 'Ceremony', 
                time: '4:00 PM', 
                quote: 'Sacred vows under endless skies...', 
                details: 'The culmination of your love story, where promises are made and two lives become one in the presence of family and friends.'
              },
              { 
                title: 'Golden Hour', 
                time: '6:30 PM', 
                quote: 'Love illuminated by nature\'s spotlight...', 
                details: 'The magical hour when soft, warm light creates the most romantic and timeless portraits of your new beginning together.'
              },
              { 
                title: 'Reception', 
                time: '8:00 PM', 
                quote: 'Joy and laughter filling the night...', 
                details: 'The celebration of your union with dancing, speeches, and moments of pure happiness shared with all your loved ones.'
              }
            ].map((moment, index) => (
              <div key={index} className="timeline-moment" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="moment-marker"></div>
                <div className="moment-content">
                  <h3>{moment.title}</h3>
                  <time>{moment.time}</time>
                  <p className="moment-quote">"{moment.quote}"</p>
                  <p className="moment-details">{moment.details}</p>
                </div>
                <div className="moment-image" style={{ 
                  backgroundImage: `url(https://images.unsplash.com/photo-${
                    index === 0 ? '1465495976277-4387d4b0e4c6' :
                    index === 1 ? '1606216794074-735e91aa2c92' :
                    index === 2 ? '1519741497674-611481863552' :
                    index === 3 ? '1537633552985-df8429e8048b' : '1511285560929-80b456fea0bc'
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)`
                }}>
                  <div className="moment-overlay">
                    <span>Captured Memory</span>
                  </div>
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
              <div key={index} className="film-frame" >
                <div className="film-sprockets">
                  <div className="sprocket"></div>
                  <div className="sprocket"></div>
                  <div className="sprocket"></div>
                </div>
                <div className="film-content" style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-${
                    index === 0 ? '1606216794074-735e91aa2c92' :
                    index === 1 ? '1519741497674-611481863552' : '1511285560929-80b456fea0bc'
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)`
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
              <div key={index} className="bts-card" >
                <div className="lens-flare"></div>
                <div className="bts-image" style={{
                  backgroundImage: `url(https://images.unsplash.com/photo-${
                    index === 0 ? '1492691527719-9d1e07e534b6' :
                    index === 1 ? '1465495976277-4387d4b0e4c6' : '1594736797933-d0b22a5e8bf2'
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80)`
                }}>
                  <div className="bts-overlay">
                    <span>{item.title}</span>
                  </div>
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
                  backgroundImage: `url(https://images.unsplash.com/photo-${
                    ['1606216794074-735e91aa2c92', '1537633552985-df8429e8048b', '1519741497674-611481863552', 
                     '1511285560929-80b456fea0bc', '1594736797933-d0b22a5e8bf2', '1465495976277-4387d4b0e4c6',
                     '1583939003579-730e3918a45a', '1492691527719-9d1e07e534b6'][i]
                  }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)`
                }}>
                  <div className="golden-overlay">
                    <span>Golden Moment {i + 1}</span>
                  </div>
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
      <footer id="footer" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>Captured in Light</h3>
              <p>Creating timeless memories through the art of photography. Every wedding tells a unique story, and we're here to preserve those precious moments forever.</p>

              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Pinterest">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-services">
              <h4>Services</h4>
              <ul>
                <li>Wedding Photography</li>
                <li>Engagement Sessions</li>
                <li>Bridal Portraits</li>
                <li>Wedding Cinematography</li>
                <li>Destination Weddings</li>
                <li>Elopement Packages</li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Get in Touch</h4>
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">📧</div>
                  <span>hello@capturedinlight.com</span>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <span>(555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2024 Captured in Light Photography <span className="divider">|</span> All Rights Reserved <span className="divider">|</span> Privacy Policy</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}