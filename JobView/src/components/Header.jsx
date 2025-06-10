import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import heroimage from "../Images/background.jpg"
import InputSearch from './InputSearch';
const StyleHeader = styled(Box)(({ theme }) => {
  return {
    padding: "20px",
    backgroundColor: "red",
    minHeight: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${heroimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
});

const Header = () => {

  return (
    <div>
      <StyleHeader>
        <InputSearch></InputSearch>
      </StyleHeader>
    </div>
  )

}
export default Header
