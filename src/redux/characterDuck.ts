

import {AxiosResponse } from "axios";
import Http from "./Http";

//constants 


interface Results {
    id: Number,
    name: String,
    type: String,
    dimension: String,
    residents: Array<String>
}

interface DBData {
    info: String,
    results: Results[],
}

interface personaDB {
    id: Number,
    name: String,
    status: String,
    species: String,
    type: String,
    gender: String,
    origin: Object,
    location: Object,
    image: String,
    episode: String[],
    url: String,
    created: String
}
interface personaOutData{
    name:String,
    specie:String,
    photo:String
}

enum ActionType {
    GET_CHARACTER_LIST = 'GET_CHARACTER_LIST'
}

interface getCharacterAction {
    type: ActionType.GET_CHARACTER_LIST,
    payload: personaOutData[]
}

type Action = getCharacterAction

interface baseState{
    pjs: personaOutData[]
}
const initialState:baseState = {
    pjs: []
}

export type {baseState}
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
async function getcharactersfromList(allDirections:String[]):Promise<personaOutData[]>{
    var characterList:personaOutData[]=[]
    Promise.all(allDirections.map(async (url)=>{
        const query:AxiosResponse = await Http.get<personaDB>(`${url}`)
        const data = JSON.parse(`${query.data}`)
        return {
            name:data.name,
            specie:data.species,
            photo:data.url}
        
    }) ).then(all=> {
        characterList=all
        return characterList})
    return characterList
}

export async function  getCharacterList(): Promise<Action>{
    var allDirections: String[] = []
    var response:AxiosResponse = await Http.get<DBData>('https://rickandmortyapi.com/api/location?page=1')
    JSON.parse(response.data).results.forEach((pj:Results)=>{
        allDirections = allDirections.concat(pj.residents) 
    })
    var personas:personaOutData[]= await getcharactersfromList(allDirections)
    console.log(personas)

    return{
        type:ActionType.GET_CHARACTER_LIST,
        payload:personas
    }        
}