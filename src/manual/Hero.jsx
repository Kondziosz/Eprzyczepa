import "./Front.css";
import { NavLink } from "react-router-dom";
function Front() 
{
  const scrollToSection = (id) => 
  {
    const section = document.getElementById(id);
    if (section) 
    {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="section" id="hero">
      <h1></h1>
      <div className="cta" onClick={() => scrollToSection("karty")}>
        <a href="#">Zobacz nasze przyczepy →</a>
      </div>
      {/* ten przekierowuje do formularza */}
      <nav className="cta !pl-[60px]">
        <NavLink to="/rezerwacja">Zarezerwuj już teraz</NavLink>
      </nav>
    </section>
  );
}

export default Front;
