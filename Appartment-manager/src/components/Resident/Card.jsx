import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);



export  function OutlinedCard(props) {
  return (
    <>
    <h1>Flat Details</h1>
      <Box
        sx={{
          minWidth: 275,
          maxWidth: 370,
          margin: " 2.5rem auto",
          textTransform: "capitalize",
        }}
      >
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                Type: {props.data.type}
              </Typography>
              <Typography variant="h5" component="div">
                Name: {props.data.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {props.data.age} {props.data.gender}
              </Typography>
              <Typography variant="body2">
                Total Resident :{props.data.flat_id.total_resident}
                <br />
                Flat No. : {props.data.flat_id.flat_no}
                <br />
                Block : {props.data.flat_id.block}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link to={"/"}>Edit Details</Link>
              </Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>
    </>
  );
}
