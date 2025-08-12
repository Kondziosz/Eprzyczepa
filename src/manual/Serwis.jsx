import './Karty.css';
import tools from '../images/tools.png'

function Serwis() 
{
  return (
    <div className='section-last'>
      <div className='containerl'>
        <div className='serwis'>
          <h2>Serwis przyczep kempingowych</h2>
          <div className="line"></div>
          <p>
                        Dodatkowo oferujemy profesjonalny serwis przyczep kempingowych, aby Twój pobyt na Chałupach stał sie jeszcze bardziej
                        komfortowy i bezproblemowy.
            <br />
                        Nasze usługi obejmują:
            <br />
            <br />
                        - <strong>Rozkładanie i składanie przedsionków</strong>
            <br />
                        - <strong>Sprzedaż przedsionków i akcesoriów Isabella</strong>
            <br />
                        - <strong>Podłogi na zamówienie</strong>
            <br />
                        - <strong>Drobne naprawy</strong>
            <br />
            <br />
                        Zaufaj naszemu doświadczeniu i ciesz się wakacjami bez trosk! Zapraszamy do kontaktu w celu uzyskania szczegółowych informacji.
          </p>
        </div>
        <div className='distance'>
          <p className='last'>  
            <br />
                                - <strong>odległość do zatoki</strong> wynosi około <strong>70 metrów</strong>,  
            <br />
                                - <strong>odległość do morza</strong> to około <strong>200 metrów</strong>.  
          </p>
          <img className='tools' src={tools} alt='tools'></img>
        </div>
                        
      </div>
    </div>
  )
}

export default Serwis