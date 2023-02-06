import React, { useState } from 'react'
import {Box, Typography, Grid, TextField, Button} from '@mui/material'
import { deepPurple, green, red } from '@mui/material/colors'
import {makeStyles} from '@mui/styles'
import List from '../student/List'
import axios from 'axios'


const useStyles = makeStyles({
    headingColor:{
        backgroundColor: deepPurple[400],
        color:'white'
    },
    addStuColor:{
        backgroundColor:green[400],
        color:'white'
    },
    stuList:{
        backgroundColor:red[400]
    },
    stuListTableHead:{
        fontSize:20,
        color:'white'
    }
})

const Home = () => {
    const classes = useStyles();

    const[data, setData] = useState({
        stuname:'',
        email:'',
    })
    const[status, setStatus] = useState(false)

    const stuData = (e) =>{
       setData({
            ...data, [e.target.name] : e.target.value
        })
    }

    const addData = async(e) =>{
        e.preventDefault()
        axios.post('http://localhost:5000/students', data)
        setData({stuname:'', email:''});
        setStatus(true)
    }

    if(status){
        return <Home />
    }

  return (
    <>
      <Box textAlign='center' className={classes.headingColor} p={2} >
        <Typography  variant='h2' >React CRUD with API Call</Typography>
      </Box>
      <Grid container spacing={2} style={{display:'flex', justifyContent:'center'}}>
            <Grid item md={5.9} xs ={12} mt={2}>
              <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
               <Typography variant='h4'>Add Student</Typography>
              </Box>
              <form noValidate>
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField autoComplete='stuName' name='stuname' variant='outlined' required fullWidth id='stuName' label="Name" autoFocus onChange={(e)=>stuData(e)} value={data.stuname} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField autoComplete='email' name='email' variant='outlined' required fullWidth id='email' label="Email" autoFocus onChange={stuData} value={data.email}/>
                    </Grid>
                  </Grid>
                  <Box m={3}>
                    <Button type='submit' variant='contained' color='primary' style={{fontSize:22,}} fullWidth 
                     onClick={addData}
                    >Add</Button>
                  </Box>
              </form>
            </Grid>
            <Grid item md={5.9} xs ={12} mt={2}>
                <Box textAlign='center' p={2} className={classes.stuList}>
                    <Typography variant='h4'>Students List</Typography>
                </Box>
                <List/>
            </Grid>
        </Grid>
    </>
  )
}

export default Home