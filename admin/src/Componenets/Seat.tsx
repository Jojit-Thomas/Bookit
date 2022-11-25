import { Tooltip } from '@mui/material'
import React from 'react'
import styled from "styled-components"

interface SeatComponentProps {
  // isReserved : boolean
  bgColor: string
  // borderColor: string
}

interface slot_type {
  id: string,
  isReserved: boolean,
  user: String
}

function Seat({ isReserved = false, seatObj }: { isReserved?: boolean, seatObj: slot_type }) {
  return <Tooltip title={seatObj.user} arrow>
    <SeatComponent bgColor={isReserved ? "#acacac" : "#000"} >
    <span style={{ "color": "#fff" }}>{seatObj.id}</span>
  </SeatComponent>
  </Tooltip>
}

const SeatComponent = styled.div<SeatComponentProps>`
  width: 80px;
  height: 80px;
  margin: 7px;
  background-color: ${props => props.bgColor};
  border: solid 5px #fff; 
  &:hover {
    opacity : 0.9;
    //background-color: red; // <Thing> when hovered
  }
`

export default Seat