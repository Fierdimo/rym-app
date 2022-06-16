import {
  BookmarkAdded,
  BookmarkAddOutlined,
  DeleteForever,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  removeBookmark,
  getAllBookmarks,
} from "../features/bookmarks/bookmarkSlice";

export default function Bookmarks() {
  const character = useAppSelector((state) => state.bookmark);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllBookmarks());
  }, []);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={6}>
        <Card sx={{ height: 555, overflow: "auto", border: 1, mt: 3 }}>
          <List>
            {character.characters.map((character) => {
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
                    secondary={character.specie}
                  />
                  <Tooltip title='Unbookmark'>
                    <IconButton
                      sx={{ mr: 8 }}
                      onClick={() => dispatch(removeBookmark(character))}
                    >
                      <DeleteForever sx={{ color: "#e21f25" }} />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}
