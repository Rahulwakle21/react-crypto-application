import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Crypto } from "../CryptoContext";
import { SingleCoin } from "../config/Api";
import CoinInfo from "../component/coinInformation/CoinInfo";
import './CoinInfo.css'
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoins = async () => {
    try {
      let res = await fetch(SingleCoin(id));
      let data = await res.json();
       setCoin(data);
    } catch (error) {
      console.log("data not found",error)
    }
  };

  console.log("im from coinComponent",coin);

  useEffect(() => {
    fetchCoins();
  }, [id]);

  return (
    <>
      <div className="coin-container">
      {coin ? (
          <>
            <div className="sidebar">
              <img src={coin.image?.large} alt={coin.name} height="200" style={{ marginBottom: "20px" }} />
              <Typography variant="h3">{coin.name}</Typography>
              <div>
                <h2>Rank : {coin.market_cap_rank}</h2>
              </div>
            </div>
            <div>
              <CoinInfo coin={coin} />
            </div>
          </>
        ) : (
          <div style={{display:"flex",height:"70vh",justifyContent:"center",alignItems:"center",marginLeft:"50%"}}>
             <Stack sm={{ color: 'grey.500' }} spacing={2} direction="row" >
        
              <CircularProgress color="success" style={{height:"100px",width:"100px"}}/>
            </Stack>
          </div>
        )}

      
      </div>
    </>
  );
};

export default Coin;
