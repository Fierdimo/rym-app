

import {AxiosResponse } from "axios";
import Http from "./Http";

//constants 

const results = {
    id: Number,
    name: String,
    type: String,
    dimension: String,
    residents: Array<String>
}

const data = {
    info: String,
    results: Array<typeof results>,
}

const personaje = {
    id: Number,
    name: String,
    status: String,
    species: String,
    type: String,
    gender: String,
    origin: Object,
    location: Object,
    image: String,
    episode: Array,
    url: String,
    created: String
}

const initialState = {
    pjs:[]
}

export type TypeofPersonaje = typeof personaje
export type TypeofInitial = typeof initialState
export type TypeofResults = typeof results

enum ActionType {
    GET_CHARACTER_LIST = 'GET_CHARACTER_LIST'
}

interface getCharacterAction {
    type: ActionType.GET_CHARACTER_LIST,
    payload: TypeofPersonaje[]
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
async function getcharactersfromList(allDirections:Array<typeof results.residents>):Promise<Array<TypeofPersonaje>>{
    var characterList:Array<TypeofPersonaje>=[]
    allDirections.forEach(async (url)=>{
        const query:AxiosResponse = await Http.get<Array<TypeofPersonaje>>(`${url}`)
        characterList.push(JSON.parse(`${query.data}`))
    }) 

return characterList
}

export async function  getCharacterList(): Promise<Action>{
    var allDirections: Array<typeof results.residents> = []
    var response:AxiosResponse = await Http.get<Array<typeof data>>('https://rickandmortyapi.com/api/location?page=1')
    JSON.parse(response.data).results.forEach((pj:typeof results)=>{
        allDirections = allDirections.concat(pj.residents) 
    })
const lista = await getcharactersfromList(allDirections)
console.log(lista)
 
    return{
        type:ActionType.GET_CHARACTER_LIST,
        payload:lista
    }
      
}