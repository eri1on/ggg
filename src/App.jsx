import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Të gjitha");
  const [isVisible, setIsVisible] = useState({});
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef(null);
  const portfolioRef = useRef(null);
  const audioRef = useRef(null);

  // Slideshow images for hero section
  const heroImages = [
    "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1594736797933-d0b22a5e8bf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  ];


const basePath = '/ggg';  // your server base URL
const videoFiles = [
  `${basePath}/videos/sound.mp4`,
  `${basePath}/videos/horse.mp4`,
  `${basePath}/videos/sea.mp4`,
];
  const handleCameraEffect = () => {
    const flash = document.querySelector(".camera-flash");
    if (flash) {
      flash.classList.add("flash");
      setTimeout(() => flash.classList.remove("flash"), 500);
    }
  };

  const handleImageLoad = (imageKey) => {
    setImagesLoaded((prev) => ({ ...prev, [imageKey]: true }));
  };

  const openPortfolioModal = (item) => {
    setSelectedPortfolioItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePortfolioModal = () => {
    setIsModalOpen(false);
    setSelectedPortfolioItem(null);
    document.body.style.overflow = "auto";
  };

  const handleKeyPress = (event) => {
    if (event.key === "Escape" && isModalOpen) {
      closePortfolioModal();
    }
  };

  useEffect(() => {
    // Initialize loading state
      console.log("Current slide:", currentSlide);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavVisible(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyPress);

    // Auto-advance slideshow
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setIsVisible((prev) => ({ ...prev, [id]: true }));

          if (id === "portfolio-section") {
            setTimeout(handleCameraEffect, 800);
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(slideInterval);
      clearTimeout(timer);
    };
  },  [currentSlide]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu when navigating
  };

  
const portfolioItems = [
  {
    id: 1,
    title: "Ceremonia e Orës së Artë",
    category: "Ceremonia",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description:
      "Një ceremoni mahnitëse e kapur gjatë orës magjike të artë, ku drita natyrore krijon atmosferën perfekte romantike.",
    location: "Parku Shtetëror Malibu Creek",
    date: "Qershor 2023",
  },
  {
    id: 2,
    title: "Ceremonia e Orës së Artë",
    category: "Ceremonia",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description:
      "Një ceremoni mahnitëse e kapur gjatë orës magjike të artë, ku drita natyrore krijon atmosferën perfekte romantike.",
    location: "Parku Shtetëror Malibu Creek",
    date: "Qershor 2023",
  },
  {
    id: 3,
    title: "Detajet e Pritjes",
    category: "Detajet",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description:
      "Detajet e bukura të pritjes që kapin atmosferën e kuruar me kujdes dhe ambjentin romantik.",
    location: "Resorti Terranea",
    date: "Shtator 2023",
  },
  {
    id: 4,
    title: "Dança e Parë",
    category: "Pritja",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description:
      "Një moment intim gjatë dansit të parë të çiftit, i rrethuar nga drita e ngrohtë e qirinjve.",
    location: "Biblioteka Huntington",
    date: "Tetor 2023",
  },
  {
    id: 5,
    title: "Unazat e Dasmës",
    category: "Detajet",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description:
      "Unazat simbolike të dasmës të kapura me detaje artistike, që përfaqësojnë lidhjen e përjetshme të dashurisë.",
    location: "Vibiana",
    date: "Nëntor 2023",
  },
  {
    id: 6,
    title: "Portreti i Çiftit",
    category: "Portretet",
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    fullImage:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    description:
      "Një portret romantik i çiftit që tregon lidhjen dhe dashurinë e tyre në një ambjent natyror mahnitës.",
    location: "Observatori Griffith",
    date: "Dhjetor 2023",
  },
];


const filteredItems =
  activeFilter === "Të gjitha"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <div className="App">
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen" aria-label="Loading website content">
          <div className="loading-content">
            <div className="camera-loading">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <h2>Captured in Light</h2>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <p>Preparing your magical journey...</p>
          </div>
        </div>
      )}
      {/* Navigation Bar */}
      <nav className={`navbar ${isNavVisible ? "visible" : ""}`}>
        <div className="nav-container">
          <div className="nav-brand" onClick={() => scrollToSection("hero")}>
            <span>Captured in Light</span>
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "active" : ""}`}
            ></span>
          </button>

          <div className={`nav-links ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <button
              onClick={() => scrollToSection("about")}
              className="nav-link"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("portfolio-section")}
              className="nav-link"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection("timeline")}
              className="nav-link"
            >
              Timeline
            </button>
            <button
              onClick={() => scrollToSection("motion")}
              className="nav-link"
            >
              Films
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="nav-link"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="contact-btn"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero" ref={heroRef}>
        <div className="hero-slideshow">
          {heroImages.map((image, index) => (
            <div
              key={index}
className={`hero-slide ${index === currentSlide ? "active" : ""} ${imagesLoaded[`hero-${index}`] ? "loaded" : ""}`}

            >
              {!imagesLoaded[`hero-${index}`] && (
                <div className="image-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              )}
            <img
  src={image}
  alt={`Wedding slide ${index + 1}`}
  loading={index === 0 ? "eager" : "lazy"}
  onLoad={() => handleImageLoad(`hero-${index}`)}
  style={{ width: 0, height: 0, position: "absolute", visibility: "hidden" }}
/>

           <div
  className="slide-image"
  style={{
    backgroundImage: `url(${image})`,
    opacity: imagesLoaded[`hero-${index}`] ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  }}
></div>

              <div className="slide-overlay"></div>
            </div>
          ))}
          <div className="floating-particles"></div>
          <div className="film-grain"></div>
        </div>

        <div className="hero-content">
          <div className="camera-breathe">
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Your Love,</span>
            <span className="title-line title-emphasis">Captured in Light</span>
          </h1>

          <p className="hero-subtitle">
            Timeless Wedding Photography & Cinematography
          </p>
        </div>

        <div className="slideshow-controls">
          <div className="slide-indicators">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`slide-indicator ${index === currentSlide ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="sunbeam"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`about-section romantic-background ${isVisible.about ? "visible" : ""}`}
      >
        <div className="falling-leaves"></div>
        <div className="container">
          <div className="about-content">
            <div className="polaroid-reveal">
              <div className="polaroid-frame">
                <div
                  className="photographer-image"
                  style={{
                    backgroundImage:
                      "url(https://imgs.search.brave.com/2CV9Cal42yiXLKVl54e8VIN3KG1rPiyW1dn2VyKjXIA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90b2dyYXBo/ZXItdGFraW5nLXBo/b3RvZ3JhcGhzLWNl/bnRyYWwtcGFyay1o/aXMtdG93bl8xMDIz/NjYxLTQxLmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA)",
                  }}
                >
                  <div className="photographer-overlay">
                    <span>captured in light</span>
                  </div>
                </div>
                <div className="polaroid-caption">
                  Capturing emotions since 1999
                </div>
              </div>
            </div>

            <div className="about-text">
              <h2>Arti i tregimit të historive</h2>
              <p>
               Çdo dasmë tregon një histori unike dashurie, dhe ne jemi këtu për të kapur ato momente të shkurtra që bëhen kujtime për gjithë jetën. Me mbi 25 vite përvojë, specializohemi në krijimin e imazheve të përjetshme që pasqyrojnë emocionet e sinqerta të ditës suaj të veçantë.


              </p>
              <div className="film-developing">
                <div className="developing-bar"></div>
                <span>Duke zhvilluar kujtime...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section with Camera Effect */}
      {/* Seksioni i Portofolit me Efekt Kamera */}
<section
  id="portfolio-section"
  className={`portfolio-section romantic-background ${isVisible["portfolio-section"] ? "visible" : ""}`}
>
  <div className="falling-leaves"></div>
  <div className="camera-flash"></div>
  <div className="floating-camera">
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  </div>

  <div className="container">
    <h2 className="section-title">Galeria e Portofolit</h2>

    <div className="gallery-filters">
      {["Të gjitha", "Ceremonia", "Portretet", "Pritja", "Detajet"].map(
        (filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ),
      )}
    </div>

    <div className="photo-wall">
      {filteredItems.map((item, index) => (
        <div
          key={item.id}
          className="photo-frame"
          style={{
            transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 1)}deg)`,
            animationDelay: `${index * 0.2}s`,
          }}
          onClick={() => openPortfolioModal(item)}
          role="button"
          tabIndex={0}
          aria-label={`Shiko artikullin e portofolit ${item.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPortfolioModal(item);
            }
          }}
        >
          {!imagesLoaded[`portfolio-${item.id}`] && (
            <div className="image-skeleton">
              <div className="skeleton-shimmer"></div>
            </div>
          )}
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onLoad={() => handleImageLoad(`portfolio-${item.id}`)}
            style={{ display: "none" }}
          />
          <div
            className={`photo-content ${imagesLoaded[`portfolio-${item.id}`] ? "loaded" : ""}`}
            style={{
              backgroundImage: imagesLoaded[`portfolio-${item.id}`]
                ? `url(${item.image})`
                : "none",
            }}
          >
            <div className="photo-overlay">
              <span>{item.title}</span>
              <div className="view-more">Kliko për të parë detajet</div>
            </div>
          </div>
          <div className="photo-shadow"></div>
        </div>
      ))}
    </div>
  </div>
</section>

      <section
  id="timeline"
  className={`timeline-section romantic-background ${isVisible.timeline ? "visible" : ""}`}
>
  <div className="falling-leaves"></div>
  <div className="container">
    <h2 className="section-title">Një Ditë në Momente.</h2>
    <div className="timeline-scroll">
      {[
        {
          title: "Përgatitjet",
          time: "10:00 E Mëngjesit",
          quote: "Anticipimi i qetë para se gjithçka të fillojë...",
          details:
            "Kapja e momenteve intime të përgatitjes, emocionet nervoze dhe vëmendja e kujdesshme ndaj çdo detaji që e bën ditën tuaj perfekte.",
          image: "https://imgs.search.brave.com/iddC_ooRXIt8JAB46QbhzOZUSybDV9-FLzKUviMvDOQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM5/MjczMzY4L3Bob3Rv/L2JyaWRlLWFuZC1n/cm9vbS1ob2xkaW5n/LXRoZWlyLWhhbmRz/LXRvZ2V0aGVyLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1j/NE1hOUhvV004NE9U/c0tlUkpDYjRZYXVW/MHotbFN2VzAxNmFR/RHlyNHY4PQ", // <-- local image path example
        },
        {
          title: "Shikimi i Parë",
          time: "2:00 PM",
          quote: "Ai moment kur koha ndalon...",
          details:
            "Emocioni i pastër dhe lidhja autentike kur shihni njëri-tjetrin për herë të parë, duke krijuar kujtime që do të zgjasin përjetësisht.",
          image: "https://imgs.search.brave.com/p9nZeYNLpRbaV3c6tRUX6HasEUaBU6luIiLEe9S-u28/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU4/MWY4ZThmMjk5NGNh/NmIzYWUzZDdjOS85/MjA5MGU4OS04Nzdl/LTQ3NmMtODZhNy1k/Y2IwNWVlMGIyNjEv/Zmlyc3QtbG9vay13/ZWRkaW5nLWFsdGVy/bmF0aXZlcy5qcGc",
        },
        {
          title: "Ceremonia",
          time: "4:00 PM",
          quote: "Betimet e shenjta nën qiellin pafund…",
          details:
            "Kulminimi i historisë suaj të dashurisë, ku premtimet bëhen dhe dy jetë bëhen një në prani të familjes dhe miqve.",
          image: "https://imgs.search.brave.com/Rvt0GSD2285ldrOOnuSnzu-1zD6lLeKXRq8U9odB-cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTkz/MzM2NDgwNi9waG90/by9ncm9vbS1hbmQt/YnJpZGUtaW4td2Vk/ZGluZy1jZXJlbW9u/eS1vbi10aGUtYmVh/Y2guanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPS15OFMtRkxO/UEJRNUJ2TkpMcDFn/NmVEM2dWR2w3cU54/c2w4WDNVME1palE9",
        },
        {
          title: "Ora e Artë",
          time: "6:30 PM",
          quote: "Dashuria e ndriçuar nga spoti i natyrës...",
          details:
            "Ora magjike kur drita e butë dhe e ngrohtë krijon portretet më romantike dhe të përjetshme të fillimit tuaj të ri së bashku.",
          image: "https://imgs.search.brave.com/V55K8BKdUuXyiZLeaRMGTWyAOL0aIBBUPGji0coLi1k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzVk/NWQwYjFkMGRmN2M4/MDAwMTg0NGYxZC9k/NmVmZGZmMS02YWMx/LTQ0NWYtOWM4MC02/NDUzZGY0MzExZTIv/R29sZGVuK0hvdXIr/V2VkZGluZytwaG90/b3N-Mi5qcGc",
        },
        {
          title: "Mbrëmje / Pjesa e pritjes",
          time: "8:00 PM",
          quote: "Gëzim dhe të qeshura që mbushin natën...",
          details:
            "Festimi i bashkimit tuaj me vallëzim, fjalime dhe momente të lumtura të ndara me të gjithë të dashurit tuaj.",
          image: "https://imgs.search.brave.com/rdZe7OnhocubdhJcQvipuminm5L6Gq_eVkUaSwLmGpY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaHV0/dGVyZmx5d3BlLndw/ZW5naW5lcG93ZXJl/ZC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTgvMTEvd2Vk/ZGluZy1yZWNlcHRp/b24taWRlYXMtaGFu/Z2luZy1saWdodHMt/b3V0ZG9vci5qcGc",
        },
      ].map((moment, index) => (
        <div
          key={index}
          className="timeline-moment"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="moment-marker"></div>
          <div className="moment-content">
            <h3>{moment.title}</h3>
            <time>{moment.time}</time>
            <p className="moment-quote">"{moment.quote}"</p>
            <p className="moment-details">{moment.details}</p>
          </div>
          <div
            className="moment-image"
            style={{
              backgroundImage: `url(${moment.image})`,
            }}
          >
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
     <section
  id="motion"
  className={`motion-section romantic-background ${isVisible.motion ? "visible" : ""}`}
>
  <div className="falling-leaves"></div>
  <div className="cinema-bg"></div>
  <div className="container">
    <h2 className="section-title">Kujtime në Lëvizje</h2>
    <p className="section-subtitle">Filma të shkurtër të përjetësisë</p>

    <div className="film-reel">
      {["Highlight Reel", "Ceremony Film", "Reception Celebration"].map((title, index) => (
        <div key={index} className="film-frame">
          <div className="film-sprockets">
            <div className="sprocket"></div>
            <div className="sprocket"></div>
            <div className="sprocket"></div>
          </div>
          <div className="film-content" style={{ position: "relative", paddingTop: "56.25%" /* 16:9 aspect ratio */ }}>
           <video
  src={videoFiles[index]}
  controls
  controlsList="nodownload"
  onContextMenu={(e) => e.preventDefault()}
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  }}
/>

            <span
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                color: "white",
                textShadow: "0 0 5px black",
                fontWeight: "bold",
              }}
            >
              {title}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>






      {/* Behind the Scenes */}
      <section
        id="behind-scenes"
        className={`behind-scenes romantic-background ${isVisible["behind-scenes"] ? "visible" : ""}`}
      >
        <div className="falling-leaves"></div>
        <div className="container">
          <h2 className="section-title">Pas Objektivit</h2>
          <blockquote className="photographer-quote">
            ""Janë më shumë se vetëm foto. Është një ndjenjë që përpiqem ta kap"
          </blockquote>

    <div className="bts-grid">
  {[
    {
      title: "Përgatitjet",
      desc: "Çdo Foto e planifikuar me qëllim dhe kujdes",
      imgUrl: "https://imgs.search.brave.com/rvXvL_HW7NuJgmKVUTfpAJvOGa5TpgA3DW795SC2vkI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/MzY2NzQ2L3Bob3Rv/L2JyaWRlLWFuZC1i/b3VxdWV0LXN0b2Nr/LWltYWdlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1TU1Zk/RndwaDdzTkVCYVBL/SDU4ZkppQTBCcTdo/cThTVmt4T0IyZmh2/R3p3PQ",  // Your image path here
    },
    {
      title: "Në Moment",
      desc: "Kapja e emocioneve autentike teksa shfaqen",
      imgUrl: "https://imgs.search.brave.com/n2q0pCDNbsib29sPA46faDtHiyKVsZ29hWwEapTHJko/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTI2/NjAyMzc4L3Bob3Rv/L25ld2x5d2VkLWNv/dXBsZS13YWxraW5n/LW91dC1jaHVyY2gt/YW5kLWNlbGVicmF0/aW5nLXdlZGRpbmct/d2l0aC1jb25mZXR0/aS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9dlJhVkx6aXh3/Mng4S1VFRVhOcThj/QkNQb2FWOHNSWFE3/U2JMOWZDV1NGYz0",  // Your image path here
    },
    {
      title: "Koha e Përkryer",
      desc: "Vite përvojë në gjetjen e dritës së duhur",
      imgUrl: "https://imgs.search.brave.com/_xFfflIQfSZVaWykxhK884MQ2DuXfDlvULpF5_lkgvU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM5/OTAwMDAxMi9waG90/by9ndWVzdHMtdGhy/b3dpbmctY29uZmV0/dGktb3Zlci1icmlk/ZS1hbmQtZ3Jvb20t/YXMtdGhleS13YWxr/LXBhc3QtYWZ0ZXIt/dGhlaXItd2VkZGlu/Zy1jZXJlbW9ueS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/X0tSdS05ZW9TcUg4/eWF6c29JRFl5MTVO/RXpTT1RUSlFSSjBJ/N0lKVE1HQT0",  // Your image path here
    },
  ].map((item, index) => (
    <div key={index} className="bts-card">
      <div className="lens-flare"></div>
      <div
        className="bts-image"
        style={{
          backgroundImage: `url(${item.imgUrl})`,
        }}
      >
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
      <section
        id="golden-gallery"
        className="golden-gallery romantic-background"
      >
        <div className="falling-leaves"></div>
        <div className="carousel-container">
          <div className="golden-carousel">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="golden-frame">
                <div className="shutter-transition"></div>
                <div
                  className="golden-image"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-${
                      [
                        "1606216794074-735e91aa2c92",
                        "1537633552985-df8429e8048b",
                        "1519741497674-611481863552",
                        "1511285560929-80b456fea0bc",
                        "1594736797933-d0b22a5e8bf2",
                        "1465495976277-4387d4b0e4c6",
                        "1583939003579-730e3918a45a",
                        "1492691527719-9d1e07e534b6",
                      ][i]
                    }?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)`,
                  }}
                >
                  <div className="golden-overlay">
                    <span>Golden Moment {i + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Showcase */}
      <section
        id="locations"
        className={`locations-section romantic-background ${isVisible.locations ? "visible" : ""}`}
      >
        <div className="falling-leaves"></div>
        <div className="container">
          <h2 className="section-title">Vendndodhjet e Preferuara të Fotografimit</h2>
          <p className="section-subtitle">
            Zbuloni disa nga destinacionet tona më të dashura romantike ku mund të kapim historinë tuaj të dashurisë
          </p>

          <div className="location-gallery">
            {[
              {
                title: "Mountain Vista",
                location: "Rocky Mountains",
                image:
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                style: { top: "15%", left: "20%" },
              },
              {
                title: "Garden Paradise",
                location: "Botanical Gardens",
                image:
                  "https://imgs.search.brave.com/b72qy9ZHQuXRYGII9inosAJRWVCM3nWRaxQrCgUAFRg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/ZWF1dGlmdWwtdmll/dy1tZXNtZXJpemlu/Zy1uYXR1cmUtdHJh/ZGl0aW9uYWwtc3R5/bGVkLWphcGFuZXNl/LWFkZWxhaWRlLWhp/bWVqaS1nYXJkZW5z/XzE4MTYyNC00Njc3/Ni5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQw",
                style: { top: "35%", left: "75%" },
              },
              {
                title: "Historic Estate",
                location: "Victorian Mansion",
                image:
                  "https://imgs.search.brave.com/bp99ykY_XSNXLCTqm96N0hEEd93HnxuY0ka1IatSz1U/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vZGlnaXRh/bC1waG90b2dyYXBo/eS1zY2hvb2wuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE3/LzExL3VsdGltYXRl/LWd1aWRlLW91dGRv/b3ItbmF0dXJlLXBo/b3RvZ3JhcGh5LTA5/LmpwZz9yZXNpemU9/NTYzLDc1MCZzc2w9/MQ",
                style: { top: "65%", left: "25%" },
              },
              {
                title: "Lakeside Romance",
                location: "Crystal Lake",
                image:
                  "https://imgs.search.brave.com/0n8INSkpjo86h_LiY1crAduPwS0X5-uljvue5LFth3M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/dGhlLWJlYXV0eS1v/Zi1uYXR1cmUtdjAt/YzFsYmx1OHVsZDFm/MS5qcGc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9ZTdmY2IzM2Yx/ZDdmMWI3ZThjN2I4/NTNhZWVjZDgzNmJm/YmYyN2Q0MQ",
                style: { top: "25%", left: "60%" },
              },
              {
                title: "Forest Cathedral",
                location: "Redwood Grove",
                image:
                  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                style: { top: "75%", left: "65%" },
              },
              {
                title: "Desert Bloom",
                location: "Joshua Tree",
                image:
                  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                style: { top: "45%", left: "40%" },
              },
            ].map((location, index) => (
              <div key={index} className="photo-pin" style={location.style}>
                <div
                  className="pin-photo"
                  style={{ backgroundImage: `url(${location.image})` }}
                >
                  <div className="pin-overlay">
                    <h4>{location.title}</h4>
                    <span>{location.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="location-message">
            <h3>We Travel Anywhere Your Heart Desires</h3>
            <p>
              These are just glimpses of the beautiful locations we've captured.
              Your perfect venue could be anywhere - from intimate backyard
              ceremonies to destination weddings. We bring our passion and
              expertise wherever your love story unfolds.
            </p>
            <button
              className="location-cta"
              onClick={() => scrollToSection("footer")}
            >
              Let's Discuss Your Dream Location
            </button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className={`pricing-section ${isVisible.pricing ? "visible" : ""}`}
      >
        <div className="container">
          <h2 className="section-title">Investment in Forever</h2>
          <div className="pricing-grid">
            {[
              {
                name: "Essential",
                price: "$2,500",
                features: [
                  "6 Hours Coverage",
                  "Digital Gallery",
                  "Print Release",
                  "Engagement Session",
                ],
              },
              {
                name: "Complete",
                price: "$4,200",
                features: [
                  "Full Day Coverage",
                  "Second Photographer",
                  "Highlight Film",
                  "Premium Album",
                  "Engagement Session",
                ],
              },
              {
                name: "Luxury",
                price: "$6,800",
                features: [
                  "Multi-Day Coverage",
                  "Cinematic Films",
                  "Premium Albums",
                  "Fine Art Prints",
                  "Drone Photography",
                ],
              },
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
              <p>
                Creating timeless memories through the art of photography. Every
                wedding tells a unique story, and we're here to preserve those
                precious moments forever.
              </p>

              <div className="social-links">
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Pinterest">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
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
              <p>
                © 2024 Captured in Light Photography{" "}
                <span className="divider">|</span> All Rights Reserved{" "}
                <span className="divider">|</span> Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Portfolio Modal */}
      {isModalOpen && selectedPortfolioItem && (
        <div
          className="modal-overlay"
          onClick={closePortfolioModal}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio image viewer"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={closePortfolioModal}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="modal-image-container">
              {!imagesLoaded[`modal-${selectedPortfolioItem.id}`] && (
                <div className="image-skeleton modal-skeleton">
                  <div className="skeleton-shimmer"></div>
                </div>
              )}
              <img
                src={selectedPortfolioItem.fullImage}
                alt={selectedPortfolioItem.title}
                className={`modal-image ${imagesLoaded[`modal-${selectedPortfolioItem.id}`] ? "loaded" : ""}`}
                onLoad={() =>
                  handleImageLoad(`modal-${selectedPortfolioItem.id}`)
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}