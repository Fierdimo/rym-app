import {configureStore, combineReducers, compose, applyMiddleware} from '@reduxjs/toolkit'

import character from './characterDuck'

 const rootReducer = combineReducers({
    character
})


const store = configureStore({
    reducer: rootReducer,
    
  })

export type RootState = ReturnType<typeof store.getState>
  
export type AppDispatch = typeof store.dispatch
  
export default store