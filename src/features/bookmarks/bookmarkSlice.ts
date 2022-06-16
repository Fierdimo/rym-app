import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

interface character {
  id: number;
  name: String;
  specie: String;
  photo: string;
  bookmarked:Boolean
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
      localStorage.setItem(
        `RyM-bookmark${character.id}`,
        JSON.stringify(character)
      );
    },
    removeBookmark(state: bookmarkState, action: PayloadAction<character>) {
      state.characters.forEach((char: character, index: number) => {
        if (char.id === action.payload.id) {
          state.characters.splice(index, 1);
          localStorage.removeItem(`RyM-bookmark${char.id}`);
        }
      });
    },
    getAllBookmarks(state: bookmarkState) {
      const keys = Object.keys(localStorage).sort();
      state.characters = []
      keys.forEach((key: string) => {
        if (key.includes("RyM-bookmark")) {
           const bookmarkedItem = (localStorage.getItem(key)) as string
           const bookmarkedChar:character = JSON.parse(bookmarkedItem)
           state.characters = [...state.characters, bookmarkedChar]    
        }
      });
    },
  },
});

export const { addBookmark, removeBookmark, getAllBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
