
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCharacterList, TypeofPersonaje } from "../redux/characterDuck"
import store,{RootState} from "../redux/store";


export default function Listar() {

    const [characterShow, setCharacterShow] = useState<typeof pjs>([]);

    const dispatch = useDispatch();
    const pjs: TypeofPersonaje[] = useSelector((store:RootState)=>store.character)

    async function retrieveChars(){
       dispatch(await getCharacterList())
        
    }

    useEffect(()=>{
        retrieveChars()
        console.log(pjs)
    },[])
    useEffect(()=>{
        setCharacterShow(pjs)
        if(pjs.length>0) console.log(pjs[0])
    },[pjs])
  return (
    <Grid container>
        <Grid item>
            nada personal
        </Grid>
    </Grid>
  )
}

