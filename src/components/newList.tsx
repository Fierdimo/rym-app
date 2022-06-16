import {
  BookmarkAddedOutlined,
  BookmarkAddOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CircularProgress,
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
import { addCharacters } from "../features/characters/characterSlice";

export default function NewList() {
  const characters = useAppSelector((state) => state.info);
  const dispatch = useAppDispatch();

  function scrolling(e: any) {
    const scrolling: number = e.target.scrollHeight - e.target.scrollTop;

    if (scrolling < 700 && characters.status !== "DONE") {
      dispatch(addCharacters(characters.page, characters.status));
    }
  }

  useEffect(() => {
    dispatch(addCharacters(1, characters.status));
    // eslint-disable-next-line
  }, []);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        xs={6}
        sx={{ height: 525, overflow: "auto", border: 1, m: 3 }}
        onScroll={(e) => scrolling(e)}
      >
        <Card>
          {characters.status === "BUSY" && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
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
                  <Tooltip title="Add Bookmark">
                    <IconButton sx={{ mr: 8 }}>
                      {character.bookmarked ? (
                        <BookmarkAddedOutlined />
                      ) : (
                        <BookmarkAddOutlined />
                      )}
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
