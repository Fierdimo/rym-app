import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import background from "../issues/banner.jpeg";

export default function TopBavBar() {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-evenly"
      alignItems="end"
      style={{
        height: "70px",
      }}
    >
      <Button
        variant="contained"
        onClick={() => navigate("/", { replace: true })}
      >
        Character List
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate("/bookmarks", { replace: true })}
      >
        Bookmarks
      </Button>
    </Grid>
  );
}
