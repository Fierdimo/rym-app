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
          <Button onClick={()=>dispatch(addCharacters(2))}>{Object.keys(characters.characters).length}</Button>
        </Grid>
        <Grid item xs={8} sx={{ height: 550, overflow: "auto",border:1, m:3 }}>
          <List>
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
