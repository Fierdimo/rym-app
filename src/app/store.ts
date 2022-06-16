import {configureStore} from '@reduxjs/toolkit'
import characterReducer from '../features/characters/characterSlice'
import bookmarkReducer from '../features/bookmarks/bookmarkSlice'

export const store = configureStore({
    reducer:{
      info:characterReducer,
      bookmark:bookmarkReducer,
    }
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch