import axios from '../../axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Componenets/sidebar/Sidebar'
import styled from "styled-components"

function Home() {
  let navigate = useNavigate()
  useEffect(() => {
    axios.get("/").then(() => console.log("success")).catch(() => navigate("/login"))
  },[])
  return <Container>
    <Sidebar></Sidebar>
    <div style={{"backgroundColor" : "#ff0"}}></div>
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

const StyledSidebar = styled(Sidebar)`

`

export default Home