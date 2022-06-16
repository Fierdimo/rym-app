import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../../app/store";
import axios, { AxiosResponse } from "axios";

export interface character {
  id: number;
  name: String;
  specie: String;
  photo: string;
  bookmarked:Boolean
}

type operation = "READY" | "BUSY" | "DONE";

export interface characterState {
  characters: {
    [id: number]: character;
  };
  charactersShow: {
    [id: number]: character;
  };
  page: number;
  status: operation;
}

const initialState: characterState = {
  characters: {},
  charactersShow: {},
  page: 1,
  status: "READY",
};

interface Results {
  id: Number;
  name: String;
  type: String;
  dimension: String;
  residents: Array<String>;
}

interface DBData {
  info: String;
  results: Results[];
}

interface personaDB {
  id: Number;
  name: String;
  status: String;
  species: String;
  type: String;
  gender: String;
  origin: Object;
  location: Object;
  image: String;
  episode: String[];
  url: String;
  created: String;
}

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    catchCharacters(state: characterState, action: PayloadAction<character[]>) {
      const characters = action.payload;
      if (state.status === "BUSY" && state.page < 8) {
        characters.forEach((char) => {
          state.characters[char.id] = char;
        });
        state.page++;
        if (state.page === 8) {
          state.status = "DONE";
        } else {
          state.status = "READY";
        }
      }
    },
    setCharacters(state: characterState, action: PayloadAction<character[]>) {
      const characters = action.payload;
      if ( state.page < 8) {
        characters.forEach((char) => {
          state.characters[char.id] = char;
        });
        state.page++;
        if (state.page === 8) {
          state.status = "DONE";
        } else {
          state.status = "READY";
        }
      }
    },
    bookmarkCharacter(state:characterState, action: PayloadAction<character>){
      const character = action.payload;
      state.characters[character.id] = {...character, bookmarked:true}
    },
    unBookmarkCharacter(state:characterState, action: PayloadAction<character>){
      const character = action.payload;
      state.characters[character.id] = {...character, bookmarked:false}
    }
  },
  extraReducers: function (builder) {
    builder.addCase("SEARCHING", (state) => {
      state.status = "BUSY";
    });
    builder.addCase("FOUND", (state) => {
      state.status = "READY";
    });
  },
});

function fetchCharacters(page: number, dispatch: AppDispatch) {
  var allDirections: String[] = [];
  axios
    .get<DBData>(`https://rickandmortyapi.com/api/location?page=${page}`)
    .then((response: AxiosResponse) => {
      const results = response.data.results;
      results.forEach((pj: Results) => {
        allDirections = allDirections.concat(pj.residents);
      });
      Promise.all(
        allDirections.map(async (url) => {
          const query: AxiosResponse = await axios.get<personaDB>(`${url}`);
          const data = query.data;
          let bookmark:Boolean = false
          if (localStorage.getItem(`RyM-bookmark${page * 10000 + data.id}`)){
            bookmark = true
          }
          return {
            id: page * 10000 + data.id,
            name: data.name,
            specie: data.species,
            photo: data.image,
            bookmarked:bookmark
          };
        })
      ).then((thisPageChars) => {
        dispatch(catchCharacters(thisPageChars));
      });
    });
}

export function addCharacters(page: number, status: operation) {
  return (dispatch: AppDispatch) => {
    if (page <= 7 && status === "READY") {
      dispatch({ type: "SEARCHING" });
      fetchCharacters(page, dispatch);
    }
  };
}

export function addAllCharacters() {
  return (dispatch: AppDispatch) => {
    for (let page = 1; page <=7;page++) {
      dispatch({ type: "SEARCHING" });
      fetchCharacters(page, dispatch);
    }
  };
}

export const { catchCharacters, setCharacters, bookmarkCharacter, unBookmarkCharacter } = characterSlice.actions;
export default characterSlice.reducer;
