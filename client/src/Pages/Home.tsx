import axios from '../axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  let navigate = useNavigate()
  useEffect(() => {
    axios.get("/").catch(() => {
      navigate('/login')
    })
  },[])
  return (
    <div>Home</div>
  )
}

export default Home