import { useState, useEffect } from "react";
import "./NavBar.css";
import logo from "../images/Logo.png";

function NavBar() 
{
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to handle mobile menu

  // Function to handle scroll event
  const handleScroll = () => 
  {
    if (window.scrollY > 50) 
    {
      setScrolled(true); // Set to true when scrolled more than 50px
    }
    else 
    {
      setScrolled(false); // Reset to false when scroll is back to the top
    }
  };

  useEffect(() => 
  {
    window.addEventListener("scroll", handleScroll);
    return () => 
    {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => 
  {
    const section = document.getElementById(id);
    if (section) 
    {
      if (id === "oferta") 
      {
        const yOffset = -90;
        const y =
          section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      else 
      {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => 
  {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}  `}>
      <div className="navbar-container">
        <img
          src={logo}
          alt="Logo"
          className="navbar-logo"
          onClick={() => scrollToSection("hero")}
        />
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <li
            className="nav-item textborder"
            onClick={() => scrollToSection("hero")}
          >
            Start
          </li>
          <li
            className="nav-item textborder"
            onClick={() => scrollToSection("oferta")}
          >
            Oferta
          </li>
          <li
            className="nav-item textborder"
            onClick={() => scrollToSection("info")}
          >
            O nas
          </li>
          <li
            className="nav-item textborder"
            onClick={() => scrollToSection("karty")}
          >
            Przyczepy
          </li>
          <li
            className="nav-item textborder"
            onClick={() => scrollToSection("kontakt")}
          >
            Kontakt
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
