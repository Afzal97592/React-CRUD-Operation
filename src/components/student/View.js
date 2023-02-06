import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody,Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import {Paper} from '@mui/material'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const View = () => {

    const[stuData, setStuData] = useState([]);
    const {id} = useParams()

    useEffect(()=>{
         const getStudentData = async() => {
            await axios.get(`http://localhost:5000/students/${id}`)
            .then((res)=>{
                setStuData(res.data);
            })
            .catch((err)=>{
                console.log(err)
            })
         }
         getStudentData();
    },[])
    console.log(stuData)

  return (
    <>
    <TableContainer component={Paper}  >
        <Table mb={100}>
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>{stuData.id}</TableCell>
                    <TableCell>{stuData.stuname}</TableCell>
                    <TableCell>{stuData.email}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
   <Link to='/' style={{textDecoration:'none'}}><Button variant='contained' color='primary' type='submit' fullWidth style={{fontSize:22, padding:2, width:'40%', marginTop:30, display:'flex', alignItems:'center', justifyContent:'center', margin:'auto'}}
  >UpDate User</Button></Link>
  </>
  )
}

export default View