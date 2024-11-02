import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Container,
  createTheme,
  MenuItem,
  Select,
  styled,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Crypto } from "../CryptoContext";

const Title = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Monstreet",
  fontWeight: "bold",
  cursor: "pointer",
});

const Header = () => {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  const { currency, symbol, setCurrency } = useContext(Crypto);

  // console.log(currency)

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title variant="h4" onClick={() => navigate("/")}>
              CryptoMaster
            </Title>
            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              style={{ width: "100px", height: "40px", marginLeft: "15px" }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
