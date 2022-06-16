import { Box, Button, Grid } from "@mui/material";
import background from "../issues/banner.jpeg";

export default function TopBavBar() {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        padding: 5,
        height: "100px",
      }}
    >
      <Button variant="contained">Character List</Button>
      <Button variant="contained">Bookmarks</Button>
    </Grid>
  );
}
