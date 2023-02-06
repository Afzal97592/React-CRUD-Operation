import React, { useEffect, useState } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material'
import {Paper} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'
import axios from 'axios';


const List = () => {

    const[data, setData] = useState([]);


    useEffect(()=>{
        const getData = async() =>{
         await axios.get('http://localhost:5000/students').then((res)=>{
            setData(res.data)
         }).catch((err)=>{
            console.log(err)
         })
            
        }
        getData();
    },[])

    const deleteItem = async(id) =>{
        //    console.log(id)

        await axios.delete(`http://localhost:5000/students/${id}`)

        var newList = data.filter((item)=>{
            return item.id !== id
        })

        setData(newList)
       
    }  
    console.log(data)

  return (
    <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow style={{backgroundColor:'#616161',}}
                            >
                                <TableCell align="center" style={{color:'white', fontSize:18, fontWeight:600}}>No.</TableCell>
                                <TableCell align="center"
                                style={{color:'white', fontSize:18, fontWeight:600}}>Name</TableCell>
                                <TableCell align="center"style={{color:'white', fontSize:18, fontWeight:600}}>Email</TableCell>
                                <TableCell align="center"
                                 style={{color:'white', fontSize:18, fontWeight:600}}
                                >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                             {
                                data.map((item, i)=>(
                                    <TableRow key={item.id}>
                                <TableCell align="center">{i+1}</TableCell>
                                <TableCell align="center">{item.stuname}</TableCell>
                                <TableCell align="center">{item.email}</TableCell>
                                <TableCell align="center" >
                                    <Link to={`/view/${item.id}`}><VisibilityIcon /></Link>
                                    <Link to={`/edit/${item.id}`}><EditIcon /></Link>
                                    <DeleteIcon onClick={()=>deleteItem(item.id)} style={{cursor:'pointer'}} />
                                </TableCell>
                            </TableRow>
                                ))
                             }
                        </TableBody>
                    </Table>
                </TableContainer>
  )
}

export default List