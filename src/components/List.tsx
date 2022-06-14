import { Button, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import {getCharacterList, TypeofResults, TypeofInitial} from '../redux/characterDuck'
import { RootState } from '../redux/store';

export default function Listar() {

    const dispatch = useDispatch();
    const characters:TypeofInitial = useSelector((store:RootState)=>store.character)
    const pjs:TypeofResults[] = characters.pjs
    
    console.log(characters.pjs)


    async function getCharacters(){
        dispatch(await getCharacterList())
    }
  return (
    <Grid container
    direction="row"
    justifyContent="center"
    alignItems="center">
        <Grid item xs={8} border= {1}>
            <Button onClick={()=>getCharacters()}>click</Button>
        </Grid>
        <Grid item xs={8}>
        <List>
            {pjs? pjs.map((char: any)=>{
                return(
                    <ListItem disablePadding key={char.id}>
                    <ListItemButton>
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary={char.name} />
                    </ListItemButton>
                </ListItem>
                )
            }):
            0}
         
    
        </List>

        </Grid>
    </Grid>    
  )
}
