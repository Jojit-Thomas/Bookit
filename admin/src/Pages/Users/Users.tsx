import axios from '../../axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Componenets/sidebar/Sidebar'
import styled from "styled-components"
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './Users.css'

function Users() {

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'name',
      headerName: 'Full name',
      width: 150,
      // editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      // editable: true,
    },
  ];
  const [users, setUsers] = useState([])
  let navigate = useNavigate()
  useEffect(() => {
    axios.get("/users").then((users) => {
      users.data.map((user: any, idx: number) => {
        user.id = idx
      })
      console.log(users.data)
      setUsers(users.data)
    }).catch(() => navigate("/login"))
  }, [])

  const handleBlock = (email: String) => {
    console.log("clicked", email)
    axios.put("/user/block", {
      email
    }).then(() => {
      axios.get("/users").then((users) => {
        users.data.map((user: any, idx: number) => {
          user.id = idx
        })
        console.log(users.data)
        setUsers(users.data)
      })
    })
  }



  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params: any) => {
        // console.log("params", params);
        return (
          <div className="cellAction">
            {params.row.isBlocked ?
              <div className="unblock" onClick={() => handleBlock(params.row.email)}>Unblock</div> :
              <div className="block" onClick={() => handleBlock(params.row.email)}>Block</div>
            }
          </div>
        );
      },
    },
  ];

  return <Container>
    <Sidebar></Sidebar>
    <DataBox>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid 
          className='user-table'
          rows={users}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
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



export default Users