import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import cieloMovimiento from './assets/videos/cieloMovimiento.mp4'
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from './components/Loading';

function App() {

  const [weather, setWeather] = useState({});

  useEffect(() => {

    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7c62ce6d727114f0c72e919a45f3b4a9`)
        .then(res => setWeather(res.data));
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  let Celsius = ((weather.main?.temp) - 273.15).toFixed(2);
  let Fahrenheit = ((Celsius * 1.8) + 32).toFixed(2);

  const [fahrenheit, setFahrenheit] = useState(false);
  const [loading, setLoading] = useState(false)

  const conversionFahrenheit = () => {
    //alert("Conversion")
    setFahrenheit(!fahrenheit);
    setLoading(!loading)
    setTimeout(() =>{
      setLoading(false);
    }, 500);
  }

  if(loading){
    return(
      <>
      <video className='Spinner' src={cieloMovimiento} autoPlay loop muted></video>
      <Loading />
      </>
      )
  }
  else{
  return (
    <div className="App">
      <video src={cieloMovimiento} autoPlay loop muted></video>
      <div className='weather'>
        <h1>Weather App</h1>
        <p className='city'>{weather.name}, {weather.sys?.country}</p>
        <div className='weather-main'>
          <div className='icon-img'>
            <p><b>{weather.weather?.[0].description}</b></p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="weather" />
            <h2 className='celsius'>{fahrenheit ? `${Fahrenheit} °F` : `${Celsius} °C`}</h2>
          </div>
          <div className='features'>
            <p className='description'><i class="fa-solid fa-wind"></i> Wind Speed: {weather.wind?.speed} m/s</p>
            <p className='description'><i class="fa-solid fa-cloud"></i> Clouds: {weather.clouds?.all} %</p>
            <p className='description'><i class="fa-solid fa-droplet"></i> Humidity: {weather.main?.humidity} %</p>
          </div>
        </div>

        <button onClick={conversionFahrenheit}><b>{fahrenheit ? "Change °C" : "Change °F"}</b></button>
      </div>

    </div>
  )
  }
}

export default App
