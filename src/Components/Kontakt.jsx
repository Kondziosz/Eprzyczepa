import "./Kontakt.css";

function Kontakt() 
{
  return (
    <div className="footer-container" id="kontakt">
      <div className="footer-content">
        {/* Right Section - Contact */}
        <div className="contact-section">
          <h2>Skontaktuj się z nami!</h2>
          <div className="contact-details">
            <div className="contact-item">
              <img src="/images/Loc-r.png" alt="Location Icon" />
              <p>
                <strong>Adres:</strong> Albatros 5,5, Chalupy
              </p>
            </div>
            <div className="contact-item">
              <img src="/images/Mail-b.png" alt="Email Icon" />
              <p>
                <strong>Email:</strong> Starki@poczta.fm
              </p>
            </div>
            <div className="contact-item">
              <img src="/images/Phone-g.png" alt="Phone Icon" />
              <p>
                <strong>Telefon:</strong> +48 602 156 630
              </p>
            </div>
          </div>
          <p className="signature">made by NW & JSK</p>
        </div>
      </div>
    </div>
  );
}

export default Kontakt;
