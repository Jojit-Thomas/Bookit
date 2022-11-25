import React, { useEffect, useState } from 'react'
import Sidebar from '../../Componenets/sidebar/Sidebar'
import styled from "styled-components"
import { Button, Grid, Paper, TextField } from "@mui/material/";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

function AddBus() {
  let navigate = useNavigate()
  useEffect(() => {
    axios.get("/").then(() => console.log("success")).catch(() => navigate("/login"))
  }, [])


  interface Values {
    name: String,
    row: Number,
    col: Number,
    fare: Number,
    from: String,
    to: String,
  }
  const [values, setValues] = useState<Values>({
    name: "",
    row: 0,
    col: 0,
    fare: 0,
    from: "",
    to: ""
  });
  const [error, setError] = useState();
  const handleChange = (e: any): void => {
    //keyof GlobalEventHandlersEventMap
    console.log(values);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (): void => {
    console.log(values);
    axios
      .post("/bus/add", values)
      .then((result) => {
        console.log("success : ", result);
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
        console.error("error : ", error.response.data);
        setError(error.response.data)
      });
  };



  return <Container>
    <Sidebar></Sidebar>
    <DataBox>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        className="login-page"
      >
        <Paper elevation={10} className="form_container">
          <TextField
            name="name"
            id="outlined-error-helper-text"
            label="Bus Name"
            placeholder=""
            fullWidth
            onChange={handleChange}
            sx={{ "margin": "10px 0px" }}
          />
          <TextField
            name="row"
            id="outlined-error-helper-text"
            label="Bus-Row-Width"
            placeholder=""
            fullWidth
            onChange={handleChange}
            sx={{ "margin": "10px 0px" }}
          />
          <TextField
            name="col"
            id="outlined-error-helper-text"
            label="Bus-Col-Width"
            placeholder=""
            fullWidth
            onChange={handleChange}
            sx={{ "margin": "10px 0px" }}
          />
          <TextField
            name="fare"
            id="outlined-error-helper-text"
            label="Fare ₹"
            placeholder=""
            fullWidth
            onChange={handleChange}
            sx={{ "margin": "10px 0px" }}
          />
          <TextField
            name="from"
            id="outlined-error-helper-text"
            label="From"
            placeholder=""
            fullWidth
            onChange={handleChange}
            sx={{ "margin": "10px 0px" }}
          />
          <TextField
            name="to"
            id="outlined-error-helper-text"
            label="To"
            placeholder=""
            fullWidth
            onChange={handleChange}
            sx={{ "margin": "10px 0px" }}
          />

          <Grid container direction="row-reverse">
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </DataBox>
  </Container>
}
const Container = styled.div`
height: 100vh;
width: 100vw;
display: grid;
grid-template-columns: 15% 85%;
@media screen and (max-width: 720px) {
  grid-template-columns: 0% 100%;
}
`

const DataBox = styled.div`
  padding: 30px
`
const StyledSidebar = styled(Sidebar)`

`

export default AddBus