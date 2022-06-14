import {configureStore, combineReducers, compose, applyMiddleware} from '@reduxjs/toolkit'

import characterReducer from './characterDuck'

 const rootReducer = combineReducers({
    data: characterReducer
})
/*
const composeEnhacers = compose;
export default function generateStore(){
    const store = configureStore(rootReducer)
    return store
}  */

const store = configureStore({
    reducer: rootReducer,
    
  })

export type RootState = ReturnType<typeof store.getState>
  
export type AppDispatch = typeof store.dispatch
  
export default store