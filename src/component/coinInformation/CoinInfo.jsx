import React, { useContext, useEffect, useState } from "react";
import { Crypto } from "../../CryptoContext";
import { HistoricalChart } from "../../config/Api";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import "./CoinInfo.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CoinInfo = ({ coin }) => {
  const [hisData, setHisData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = useContext(Crypto);

  const historicChartData = async () => {
    try {
      let res = await fetch(HistoricalChart(coin.id, days, currency));
      let data = await res.json();
      setHisData(data.prices);
    } catch (error) {
      console.log("historic data not found", error);
    }
  };

  console.log("historic data", hisData);

  useEffect(() => {
    historicChartData();
  }, [currency, days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className="chart-container">
          {!hisData ? (
            <CircularProgress
              style={{
                color: "red",
                width: "250px",
                height: "250px",
                marginLeft: "50%",
              }}
            />
          ) : (
            <>
              <Line
                data={{
                  labels: hisData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
                  datasets: [
                    {
                      data: hisData.map((coin) => coin[1]),
                      label: `Price (Past ${days} Days) in ${currency}`,
                      borderColor: "gold",
                    },
                  ],
                }}
               
              />
            </>
          )}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default CoinInfo;
