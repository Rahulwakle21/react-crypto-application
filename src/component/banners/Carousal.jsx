import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material";
import { TrendingCoins } from "../../config/Api";
import { Crypto } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const CarousalContainer = styled("div")({
  height: "50%",
  display: "flex",
  alignItems: "center",
});

const Carousal = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = useContext(Crypto);

  const fetchTrendingCoin = async () => {
    try {
      const res = await fetch(TrendingCoins(currency));
      const data = await res.json();
      setTrending(data);
    } catch (error) {
      console.error("Failed to fetch trending coins", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoin();
  }, [currency]);

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`} key={coin.id}  style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
        textTransform:"uppercase",
        color: "inherit",
      }}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80px"
          style={{ marginBottom: "10px" }}
        />
        <span>
          {coin.symbol.toUpperCase()} &nbsp;
          <span style={{ color: profit ? "green" : "red" }}>
            {profit && "+"}
            {coin.price_change_percentage_24h
              ? coin.price_change_percentage_24h.toFixed(2)
              : "N/A"}
            %
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {coin.current_price.toFixed(2)}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <CarousalContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </CarousalContainer>
  );
};

export default Carousal;
