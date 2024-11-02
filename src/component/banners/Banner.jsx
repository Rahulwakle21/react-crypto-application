import { Container, makeStyles, Typography } from '@mui/material'
import React from 'react'
import './Banner.css'
import Carousal from './Carousal'

const Banner = () => {

  return (
        
    <div className='bannerHead'>
        <Container className='bannerContent'>
            <div className='tagLine'>
                <Typography variant='h2' style={{fontWeight:"bold",marginBottom:"15px",fontFamily:"Montserrat"}}>
                    Crypto Masters
                </Typography>
                <Typography variant='subtitile' style={{fontWeight:"semi-bold",color:"darkgray" ,textTransform:"capitalize"}}>
                   get all info regarding your fav crypto
                </Typography>
            </div>
            <Carousal/>
        </Container>
    </div>
  )
}

export default Banner
