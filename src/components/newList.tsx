import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addCharacters } from "../features/characters/characterSlice";

export default function NewList() {
  const characters = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();

  function scrolling(e: any) {
    const scrolling: number = e.target.scrollHeight - e.target.scrollTop;

    if (scrolling < 2000 && characters.status !== "DONE") {
      dispatch(addCharacters(characters.page, characters.status));
    }
  }

  useEffect(() => {
    dispatch(addCharacters(1, characters.status));
  }, []);

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          xs={8}
          sx={{ height: 550, overflow: "auto", border: 1, m: 3 }}
          onScroll={(e) => scrolling(e)}
        >
          {characters.status === "BUSY" && (<CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />)}
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
