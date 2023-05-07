import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const INITIAL_STATE = {
    Data:null,
    loading:false,
    city : ''
}

export const fetchData = createAsyncThunk('apiCall/fetchData',async(city)=>{
    
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    return response
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
            state.Data = action.payload.data
        },
        [fetchData.rejected] : (state) =>{
            state.loading = false
        },
      
    }
})
export const {handleCityChange} = fetchDataSlice.actions
export default fetchDataSlice.reducer