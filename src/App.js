
import { useEffect, useMemo} from 'react';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentWeather, fetchData, handleCityChange } from './Redux/DataReducer';
import dateFormat from "dateformat";
import ReactLoading from 'react-loading';
import Card from './components/card/Card';

function App() {
  const {Data, loading, city, forecastData} = useSelector(state => state.fetchData)
  const dispatch = useDispatch()
  const now = new Date()

  return (
    <div className="App">
      <form className='inputFieldCont' action="">
      <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        <input className='cityInput' onChange={(e)=>dispatch(handleCityChange(e))} autoFocus type="text" placeholder='Search' />
        <button style={{display:'none'}} type='submit'  onClick={(e)=>{
          e.preventDefault()
          dispatch(fetchData(city))
          }}></button>
      </form>

      {Data && <div className="weatherDisplayContainer">
        <div className="wdcTop">
          <div className="wdcLeft">
            <div className="cityName">{Data?.name}</div>
            {Data && <div className="date">{dateFormat(now, " mmmm d, yyyy")} </div>}
            <img className='weatherIcon' width={100} src={`http://openweathermap.org/img/w/${Data?.weather[0].icon}.png`} alt="" />
            <p className="weatherDes">{Data?.weather[0].main} </p>
          </div>

          <div className="wdcRight">
            <div className="temperature">{parseInt(Data?.main.temp)}&deg;C </div>
            <div className="maxNminTemp">{parseInt(Data?.main.temp_max)}&deg;/{parseInt(Data?.main.temp_min)}&deg;</div>
          </div>
        </div>

        <div className="wdcBottom">
          {forecastData.map((item, index)=>{
            if(index == 0) return;
            return <Card data={item} key={index}></Card>
          })
          }
        </div>

      </div>}
      
      {loading && <div className="loader"> <ReactLoading type={'spinningBubbles'} color={'white'} height={'auto'} width={100} /></div>}
      
    </div>
  );
}

export default App;
