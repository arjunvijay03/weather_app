import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const INITIAL_STATE = {
    Data:null,
    forecastData:null,
    loading:false,
    city : ''
}

export const fetchData = createAsyncThunk('apiCall/fetchData',async(city)=>{
    
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    const forecast = await axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${city}&days=5&key=bc21ef0965364a939c774652230805`)
    return {weather, forecast}
}) 



const fetchDataSlice = createSlice({
    name: 'apiCall',
    initialState : INITIAL_STATE,
    reducers:{
        handleCityChange : (state, action)=>{
            state.city = action.payload.target.value
        },
        setData : (state, action)=>{
            state.Data = action.payload
        }
        
    },
    extraReducers:{
        [fetchData.pending] : (state)=>{
            state.loading = true
        },
        [fetchData.fulfilled] : (state, action) =>{
            state.loading = false
            state.Data = action.payload.weather.data
            state.forecastData = action.payload.forecast.data.forecast.forecastday
        },
        [fetchData.rejected] : (state, action) =>{
            state.loading = false
            alert("Give a valid city name")
        },
      
    }
})
export const {handleCityChange} = fetchDataSlice.actions
export default fetchDataSlice.reducer