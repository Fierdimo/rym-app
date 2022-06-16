import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface character {
  id: number;
  name: String;
  specie: String;
  photo: string;
}

interface bookmarkState {
  characters: character[];
}
const initialState: bookmarkState = {
  characters: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark(state: bookmarkState, action: PayloadAction<character>) {
      const character = action.payload;
      state.characters = [...state.characters, character];
    },
    removeBookmark(state:bookmarkState, action: PayloadAction<number>){
        state.characters.splice(action.payload,1)
    }
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
