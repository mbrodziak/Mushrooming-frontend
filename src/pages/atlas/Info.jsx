import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const fetchDetails = async (id) => {
  const res = await fetch(`https://mushrooming-backend.herokuapp.com/mushrooms/${id}/`);
  return res.json();
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    background: "rgba(41, 40, 38, 0.5)",
    margin: "2rem auto"
  },
  cont: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    background: "rgba(41, 40, 38, 0.5)",
    fontSize: "calc(18px + (22 - 18) * ((100vw - 200px) / (1920 - 200)))",
  },
  acc: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: "white",
    background: "rgba(41, 40, 38, 0.5)",
  },
  description: {
    fontSize: "calc(14px + (20 - 14) * ((100vw - 200px) / (1920 - 200)))",
  },
  image: {
    opacity: "0.7",
    height: "100%",
    width: "100%",
    borderRadius: "3px",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  heading: {
    fontSize: "calc(16px + (22 - 16) * ((100vw - 200px) / (1920 - 200)))",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 auto",
  },
  table: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "white",
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  row: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center",
    background: "rgba(41, 40, 38, 0.5)",
    margin: ".3rem",
    fontSize: "calc(14px + (20 - 14) * ((100vw - 200px) / (1920 - 200)))",
    ['@media (max-width:400px)']: { // eslint-disable-line no-useless-computed-key
      display: "flex",
      flexDirection: "column",
    }
  },
  firstRow: {
    fontWeight: "bold",
  }
}));

const Info = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  let { id } = useParams();

  const { data, status } = useQuery([id], fetchDetails);

  if (status === "success") console.log(data);

  return (
    <div>
      {status === "error" && <p>Błąd pobierania danych z bazy!</p>}
      {status === "success" && (
        <Box>
          <Container maxWidth="md" >
            <Card className={classes.paper}>
              <Typography variant="h4" color="secondary">
                {data.name}
              </Typography>
              <Typography variant="h6">{data.latin_name}</Typography>
              <CardMedia
                className={classes.image}
                component="img"
                alt={data.name}
                image={"https://mushrooming-backend.herokuapp.com" + data.photo}
                title={data.name}
              ></CardMedia>
              <Typography className={classes.cont}>
                {data.introduction}
              </Typography>
              <Box className={classes.table}>
                <Box
                  className={classes.row}
                >
                  <Box className={classes.firstRow} p={1}>Rodzaj:</Box>
                  <Box p={1}>{data.application}</Box>
                </Box>
                <Box
                  className={classes.row}
                >
                  <Box className={classes.firstRow} p={1}>Typ:</Box>
                  <Box p={1}>{data.type}</Box>
                </Box>
                <Box
                  className={classes.row}
                >
                  <Box className={classes.firstRow} p={1}>Zapach:</Box>
                  <Box p={1}>{data.smell}</Box>
                </Box>
                <Box
                  className={classes.row}
                >
                  <Box className={classes.firstRow} p={1}>Smak:</Box>
                  <Box p={1}>{data.taste}</Box>
                </Box>
              </Box>
              <Accordion className={classes.acc}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Kapelusz</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.description}>{data.description_fruitcake}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.acc}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                    <Typography className={classes.heading}>{data.type.charAt(0).toUpperCase() + data.type.slice(1)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.description}>{data.details_type}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.acc}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Miąższ</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.description}>{data.description_pulp}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.acc}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography className={classes.heading}>Trzon</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.description}>{data.description_shaft}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.acc}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography className={classes.heading}>
                    Występowanie
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className={classes.description}>{data.existence}</Typography>
                </AccordionDetails>
              </Accordion>
            </Card>
          </Container>
          <Box display="flex" alignItems="center" justifyContent="center" m={2}>
            <Button
              variant="contained"
              color="inherit"
              component="span"
              size="small"
              onClick={() => navigate('..')}
            >
              Powrót
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Info;
