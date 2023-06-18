import { useState } from 'react'
import './App.css'
import { CityWeather } from './services/interfaces'
import { WEATHER_API_KEY, WEATHER_API_URL } from './config/settings'

function App() {
  const [city, setCity] = useState<String>('')
  const [cityWeather, setCityWeather] = useState<CityWeather>()
  const [loading, setLoading] = useState<Boolean>(false)

  const searchHandler = () => {
    setLoading(true)
    dataFetch()
  }

  const dataFetch = async () => {
    fetch(`${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${city}&aqi=no`)
    .then(res=>res.json())
    .then(data=>{
      setCityWeather(data)
      setLoading(false)
    })
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div>
        Ingrese la ciudad la cual desea consultar: 
      </div>
      <div className='inputContainer'>
        <input 
          className="textInput"
          type="text" 
          placeholder="Lima" 
          onChange={(e)=>setCity(e.currentTarget.value)}
          />
        <input 
          className="buttonInput"
          type="button"
          value="Buscar" 
          onClick={searchHandler}
          />
      </div>
      { 
      loading?
        <>
          <div>Cargando...</div>
        </>
        :<>
          <div className="infoContainer">
            <div className="textContainer">
              <div className="infoTop">
                <div className='infoRow'>
                  {cityWeather?.location.name}, {cityWeather?.location.region}
                </div>
                <div className='infoRow'>
                  {cityWeather?.location.country} 
                </div>
              </div>

              <div className='infoBottom'>
                <div className='infoRow'>
                  Temperatura: {cityWeather?.current.temp_c}°C
                </div>
                <div className='infoRow'>
                  {cityWeather?.current.condition.text}
                </div>
              </div>
            </div>
            <div className='imageContainer'>
              <img src={cityWeather?.current.condition.icon} alt="Weather condition" />
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
