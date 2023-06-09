
import '../styles/Page1.css'
import {  useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import WeatherContext from '../context/WeatherContext'

function Page1() {
  let navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const {onWeatherChange } = useContext(WeatherContext);

 
  const handleButtonClick = async () => {
    console.log('city name ==> ', cityName)
    
    const apiKey = 'iWsjSEdCsCzOzZgjK0gtNzy805Yt9Gb9'; 
    async function accuWeatherAPICall() {
    const endpoint = "https://dataservice.accuweather.com/currentconditions/v1/";
      const response = await fetch(endpoint + cityName + "?apikey=" + apiKey);
      const data = await response.json();
       console.log('current condition data =>', data)
      return data;
    }
    
    async function getWeatherData(searchText) {
      console.log('getting weather data for =>', searchText)
      try {
        const getLocationUrl = `https://dataservice.accuweather.com/locations/v1/search?apikey=${apiKey}&q=${searchText}`;
        const locationResponse = await fetch(getLocationUrl);
        const locationData = await locationResponse.json();
        console.log('location data ==> ', locationData)
        if(locationData.length === 0) {
            console.log('Please Enter Proper city name')
            setErrorMsg('Please Enter Proper city name')
            return
         }
        const cityKey = locationData[0]?.Key;
        const country = locationData[0]?.Country.EnglishName;
        console.log('city key ==>', cityKey )
        const weatherData = await accuWeatherAPICall(cityKey);
        onWeatherChange([locationData[0]?.EnglishName, weatherData[0]?.Temperature.Metric.Value +"° C", weatherData[0]?.WeatherText,weatherData[0]?.HasPrecipitation,weatherData[0]?.WeatherIcon, country, weatherData[0]?.Temperature.Imperial.Value + "°F", ]
        )
       // console.log(weather)
        return ({
          cityKey: cityKey
        });
      } catch (error) {
        console.error(error);
        setErrorMsg('Please try again after sometime')
      }
    }
   // setCityData(await getWeatherData(cityName));
    let cityData = await getWeatherData(cityName)
    let cityKey = cityData?.cityKey
    if(cityKey){ navigate('/Page2');} else {
      console.log('unable to navigate as no data is fetched')
    }
     console.log(cityData)
  };
  
  const handleInputChange = (event) => {
    setCityName(event.target.value);
  };

  const addCity = (e) => {
    setCityName(e.value)
    console.log("selected city", e.value)
  }

  const getDefaultLocation = async () => {
    let latitude = ""
    let longitude = ""
    let location = navigator.geolocation.getCurrentPosition((p)=>{
      latitude = p.coords.latitude;
      longitude = p.coords.longitude
    })

    let resp = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=iWsjSEdCsCzOzZgjK0gtNzy805Yt9Gb9&q=${latitude} , ${longitude}`)
    
    let data= await resp.json()
   let currentCity = data.LocalizedName

   setCityName(currentCity)
     handleButtonClick(cityName);
  }

  const onKeyPress = (e) => {
    if(e.which === 13) {
      handleButtonClick();
    }
  }

  return (
    <div className="blue-box">
    <div className="white-box" style={{height: "200px"}}>
      <h3>Weather App</h3>
      <hr/>
      {/* <div className="input-wrapper">
        <input type="text" placeholder="Enter city name" value={cityName}  onKeyPress={onKeyPress} onChange={handleInputChange}/>
      </div> */}
     <select name="cities" id="cities-select" >
    <option value="Kottayam" onClick={addCity}>Kottayam</option>
    <option value="Kochi" onClick={addCity}>Kochi</option>
    <option value="Kollam" onClick={addCity}>Kollam</option>

</select>

      <div style={{color: "red", fontSize: '12px'}}>{errorMsg} </div>
      <div className="separator">or</div>
      <button className="get-location-button" onClick={getDefaultLocation} style={{paddingBottom:"25px"}} >Get Device Location</button>
    </div>
  </div>
  );
}

export default Page1;
