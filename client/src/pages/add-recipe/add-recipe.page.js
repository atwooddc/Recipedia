import React from 'react'

import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from "@mui/material/styles";


import { makeStyles } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Container from "@mui/material/Container";




const AddRecipePage = () => {

  const theme = createTheme({
    palette: {
        primary: {
            main: "#F26969",
        },
    },
  });


  return (

    <ThemeProvider theme={theme}>

      {/* SYNC UP WITH MARK'S MANUAL INPUT FORM */}

      <h2>Enter the link to your recipe here</h2>

        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' , minWidth: '80vw'}}
        
        >

            <FormGroup row style={{width: "70%"}}> 
              <Button variant="contained" disableElevation style={{width: 100}}>Submit</Button>
              <TextField variant="outlined" placeholder="www.myrecipe.com" style={{width: "80%"}}/>
            </FormGroup>


          {/* <Grid item xs={3}>
            <FormGroup row>
              <Button variant="contained" disableElevation>Submit</Button>
              <TextField variant="outlined" placeholder="www.example.com" />
            </FormGroup>
          </Grid> */}

        </Grid> 
  </ThemeProvider>
  )
}

export default AddRecipePage