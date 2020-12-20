import React from "react";
import { useQuery } from "react-query";
import { useLocation } from 'react-router-dom';
import Mushroom from '../../components/Mushroom'
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const fetchMushrooms = async (loc) => {
    if(loc.pathname.includes("borowiki")) {
        const res = await fetch("https://mushrooming-backend.herokuapp.com/mushrooms/?category=borowiki");
        return res.json();
    }
    else if(loc.pathname.includes("podgrzybki")) {
        const res = await fetch("https://mushrooming-backend.herokuapp.com/mushrooms/?category=podgrzybki");
        return res.json();
    }
    else if(loc.pathname.includes("maslaki")) {
        const res = await fetch("https://mushrooming-backend.herokuapp.com/mushrooms/?category=maslaki");
        return res.json();
    }
    else if(loc.pathname.includes("muchomory")) {
        const res = await fetch("https://mushrooming-backend.herokuapp.com/mushrooms/?category=muchomory");
        return res.json();
    }
    else if(loc.pathname.includes("mleczaje")) {
        const res = await fetch("https://mushrooming-backend.herokuapp.com/mushrooms/?category=mleczaje");
        return res.json();
    }
    else return null;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: "1rem",
    marginRight: "1rem",
    marginTop: "3rem",
  }
}));

const Mushrooms = () => {
  let location = useLocation();
  const { data, status } = useQuery([location], fetchMushrooms);
  const classes = useStyles();

  return (
    <div>
      {status === "error" && <p>Błąd pobierania danych z bazy!</p>}
      {status === "success" && (
        <div className={classes.root}>
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="stretch"
            justify="center"
          >
            {data.map((mushroom) => (
              <Mushroom key={mushroom.id} mushroom={mushroom} />
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Mushrooms;
