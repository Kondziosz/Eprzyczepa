import "./Przyczepy.css";


function Przyczepy() {
  return (
    <div className="przyczepy" id="przyczepy">
      <div className="about-container">
        {/* First Section - Image with First h2 and p */}
        <div className="section-2">
            <div className="about-text">
                <h2>Poznaj nasze przyczepy</h2>
                <div className='line'></div>
                <p>
                Posiadamy 4 przyczepy kempingowe, wszystkie zlokalizowane obok siebie,
                <br />
                co umożliwia organizowanie pobytów dla większych grup znajomych lub rodzin.
                <br />
                <br />
                - <strong>3 przyczepy</strong> są przystosowane dla <strong>6 osób</strong>,
                <br />
                - <strong>1 przyczepa</strong> jest przeznaczona dla <strong>4 osób</strong>.
                <br />
                <br />
                Każda przyczepa wyposażona jest w:
                <br />
                - <strong>przedsionek</strong>,
                <br />
                - <strong>drewnianą podłogę</strong>,
                <br />
                - <strong>aneks kuchenny</strong> z pełnym wyposażeniem.
                <br />
                </p>
            </div>
            <div className="about2-image">
                <img
                src="/images/przyczepy.jpeg"
                alt="Przyczepy Kempingowe"
                />
            </div>
            </div>


      </div>
    </div>
  )
}

export default Przyczepy
