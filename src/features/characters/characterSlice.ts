import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "../../app/store";
import axios, { AxiosResponse } from "axios";
import { Root } from "react-dom/client";

export interface character {
  id: number;
  name: String;
  specie: String;
  photo: string;
}

export interface characterState {
  characters: {
    [id: number]: character;
  };
  page: number;
  status: string;
}
const initialState: characterState = {
  characters: {},
  page: 0,
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

      if (state.status === "READY") {
        state.status='BUSY'
        characters.forEach((char) => {
          state.characters[char.id] = char;
        });
        state.page++;
        console.log(state.page);
        state.status='READY'
      }
    },
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
          return {
            id: page * 10000 + data.id,
            name: data.name,
            specie: data.species,
            photo: data.image,
          };
        })
      ).then((all) => {
        dispatch(catchCharacters(all));
      });
    });
}

export function addCharacters(page: number) {
  return (dispatch: AppDispatch) => {
    if (page < 8) {
      setTimeout(fetchCharacters, 1000, page, dispatch);
    }
  };
}

export const { catchCharacters } = characterSlice.actions;
export default characterSlice.reducer;
