import { useDispatch, useSelector } from 'react-redux'
import {getCharacterList} from '../redux/characterDuck'
import { RootState } from '../redux/store';

export default function List() {

    const dispatch = useDispatch();
    const characters = useSelector((store:RootState)=>store.data) 


    async function getCharacters(){
        dispatch(await getCharacterList())
    }
  return (
    <div>
        List
        <button onClick={()=>getCharacters()}>click</button>
    </div>
    
  )
}
