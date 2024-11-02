import React, { useContext, useEffect, useState } from 'react'
import { CoinList } from '../../config/Api'
import { Crypto } from '../../CryptoContext'
import { Container, createTheme, LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CoiTable = () => {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currency,symbol } = useContext(Crypto);

  const fetchCoins = async () => {
    setLoading(true);
    const res = await fetch(CoinList(currency));
    const data = await res.json();
    setCoins(data);
    setLoading(false);
  };

  console.log(coins)

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin) => 
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant='h4' style={{ margin: "18px" }}>
          CryptoCurrency Prices by Market Caps
        </Typography>
        <TextField
          label="Search Crypto..."
          variant="outlined"
          style={{ marginBottom: "20px", width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#B59410" }}>
                <TableRow>
                  {["Coin", "Price", "24hr Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{ color: 'black', fontWeight: "700" }}
                      key={head}
                      align={head === "Coin" ? "left" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice(( page-1) *10 , (page-1) *10 +10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.id}
                      style={{ cursor: "pointer" }}
                    >
                      <TableCell component='th' scope='row' style={{ display: 'flex', alignItems: 'center', gap: "15px" }}>
                        <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: '10px',marginTop:"5px" }} />
                        <div style={{display:"flex", flexDirection:"column"}}>
                          <span style={{ textTransform: "uppercase", fontSize: 22 }}>{row.symbol}</span>
                          <span style={{ color: "darkgray" }}>{row.name}</span>
                        </div>
                      </TableCell>
                      <TableCell align='right'>
                        {symbol}{row.current_price.toFixed(2)}
                      </TableCell>
                      <TableCell
                        align='right'
                        style={{ color: profit ? "rgb(14, 203, 129)" : "red", fontWeight: 500 }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)} %
                      </TableCell>
                      <TableCell align='right'>
                        {symbol} {row.market_cap.toString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination 
        style={{padding:"20px",width:"100%", display:"flex",justifyContent:"center"}}
        count={(handleSearch().length/10).toFixed(0)}
        onChange={(_,value)=>{
            setPage(value);
            window.scroll(0,450)
        }}
        />

    
      </Container>
    </ThemeProvider>
  );
};

export default CoiTable;
