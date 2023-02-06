import { Typography, Box, Grid, TextField, Button } from '@mui/material'
import { green } from '@mui/material/colors'
import {makeStyles} from '@mui/styles'
import { textAlign } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const useStyles  = makeStyles({
        heading:{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:green[500],
            color:'white',
            textAlign:"center"
        },
        inputFileds:{
            margin:'auto',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        }
})


const Edit = () => {
    const classes = useStyles()
    const{id} = useParams()

    const[newData, setNewData] = useState({
        stuname:'',
        email:''
    })

    const navigate = useNavigate()

    // const[data, setData] = useState([])

    const updateData = (e) =>{
        setNewData({
            ...newData, [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{

        const getStudent = async() =>{
            await axios.get(`http://localhost:5000/students/${id}`).then((res)=>{
                newData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
        getStudent();

    },[])

    const submitUpdatedData = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/students/${id}`, newData)
        navigate('/')
    }
    // console.log(data)

  return (
    <>
       <Box className={classes.heading} p={2} >
        <Typography variant='h3'>Update User Data</Typography>
       </Box>
       <Grid container  width={{lg:'50%', sx:'100%'}} gap={2} mt={3} className={classes.inputFileds}>
        <Grid lg={4} xs={10}>
        <TextField autoComplete='id' name='id' value={id}  variant='outlined' required fullWidth id='id' label="ID" autoFocus  disabled={true} />
        </Grid >
        <Grid lg={6} xs={10}>
        <TextField autoComplete='stuname' name='stuname' value={newData.stuname}  variant='outlined' required fullWidth id='stuname' label="Name" autoFocus 
         onChange={updateData}
        />
        </Grid>
        <Grid lg={10} xs={10}>
        <TextField  name='email'  variant='outlined' required fullWidth id='email' label="Email" autoFocus 
         onChange={updateData}
        />
        </Grid>
        <Grid lg={6} xs={6} mt={2}>
        <Button variant='contained' color='primary' type='submit' fullWidth style={{fontSize:22, padding:5}}
          onClick={submitUpdatedData}
        >UpDate User</Button>
        </Grid>
       </Grid>

    </>
  )
}

export default Edit