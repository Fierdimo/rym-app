import {
  Avatar,
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addCharacters } from "../features/characters/characterSlice";

export default function NewList() {
  const characters = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();

  function scrolling(e: any){
    //console.log(e.target.scrollHeight - e.target.scrollTop)

    if(e.target.scrollHeight - e.target.scrollTop< 600){

      dispatch(addCharacters(characters.page + 1))
    }
  }

  useEffect(() => {
    dispatch(addCharacters(1));
  }, []);

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Button onClick={() => dispatch(addCharacters(characters.page + 1))}>
            {characters.page}
          </Button>
        </Grid>
        <Grid
          item
          xs={8}
          sx={{ height: 550, overflow: "auto", border: 1, m: 3 }}
          onScroll={e=>scrolling(e)}
        >
          <List >
            {Object.values(characters.characters).map((character) => {
              return (
                <ListItem key={character.id}>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ width: 56, height: 56, mr: 3 }}
                      alt={character.name + " photo"}
                      src={character.photo}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={character.name}
                    secondary={character.id}
                  />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
