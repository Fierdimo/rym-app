

import { Dispatch } from "redux";
import { Axios, AxiosResponse } from "axios";

const Http = new Axios({
    baseURL: 'https://rickandmortyapi.com/api/',
    headers: {
        "Content-type": "application/json"
      }
})

//constants 
const initialState = {
    pjs:[]
}
const results = {
    id: Number,
    name: String,
    type: String,
    dimension: String,
}

const data = {
    info: String,
    results: Array<typeof results>,
}

const personaje = {
    name : String,
    specie: String,
    photo: String
}

enum ActionType {
    GET_CHARACTER_LIST = 'GET_CHARACTER_LIST'
}

interface getCharacterAction {
    type: ActionType.GET_CHARACTER_LIST,
    payload: Array<typeof results>
}
type Action = getCharacterAction

//reducers
export default function reducer(state = initialState, action: Action){
    switch(action.type){
        case ActionType.GET_CHARACTER_LIST:
            return {...state, pjs:action.payload};
        default:
            return state
    }
}

//actions
export async function  getCharacterList(): Promise<Action>{
   const response:AxiosResponse = await Http.get<Array<typeof data>>('location?page=6')
   const personajes = JSON.parse(response.data).results.map((pj:typeof results)=>{
    return {
        id: pj.id,
        name: pj.name,
        type: pj.type,
        dimension: pj.dimension,
    }
})

    return{
        type:ActionType.GET_CHARACTER_LIST,
        payload:personajes
    }
      
}