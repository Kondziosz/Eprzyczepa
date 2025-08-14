import "./mapa.css";

function Mapa() 
{
  return (
    <div className="mapa">
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2301.944253219077!2d18.49169057690647!3d54.763366872734075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTTCsDQ1JzQ4LjEiTiAxOMKwMjknMzkuNCJF!5e0!3m2!1spl!2spl!4v1737745951789!5m2!1spl!2spl"
          title="Google Maps Location"
          className="location-map"
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
  );
}

export default Mapa;
