import './Front.css'

function Front() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section className='section' id="hero"> 
    <h1></h1>
        <div className="cta" onClick={() => scrollToSection('karty')}>
          <a href="#">Zobacz nasze przyczepy →</a>
        </div>
    </section>
  )
}

export default Front