import '../styles/Page2.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import WeatherContext from '../context/WeatherContext'


function Page2 () {
    let navigate = useNavigate();
    let source = ''
    const { weather } = useContext(WeatherContext);
    if(String(weather[4]).length === 1){
        source = `https://developer.accuweather.com/sites/default/files/0${weather[4]}-s.png`
        console.log('icon legth 1')
    } else {
        source = `https://developer.accuweather.com/sites/default/files/${weather[4]}-s.png`
    }

    let precipitation = ""
     if(weather[3]){ precipitation = 'Has Precipitation'} else { precipitation = 'No precipitation'}

    return (
<div className="blue-box">
    <div className="white-box">
        <header>
            <button className="back-button" onClick={()=>{ navigate('/');  }}>
            <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h3>Weather App</h3>
        </header>
        <hr />
        <div className="display">
            <img 
            src={source}
            alt="new"
            style={{height: '75px', width: "125px"}}
            />
            <div className='temp'>{weather[1]}</div>
            <div className='description'>{weather[2]}</div>
            <div className='location'>
            <FontAwesomeIcon icon={faLocationPin} style={{height: "20px", width: "10px", paddingTop: "5px"}} /> {weather[0]}, {weather[5]} </div>
        </div>
        <hr />
        <div className="humidity-section">
            <div className="humidity">
                <p >{precipitation}</p>
            </div>
            <hr />
            <div className="feels">{weather[6]}</div>
        </div>
    </div>
</div>

      
    )
}

export default Page2;