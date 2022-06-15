import {configureStore} from '@reduxjs/toolkit'
import characterReducer from '../features/characters/characterSlice'

export const store = configureStore({
    reducer:{
      info:characterReducer,
    }
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch