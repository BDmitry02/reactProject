import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./utils/store/store.ts";
import { SnackbarProvider } from "notistack";
import {
  lightTheme,
  darkTheme,
} from "./components/HeaderComponents/Theme/ThemeStyle.ts";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage.tsx";
import ItemPage from "./pages/ItemPage/ItemPage.tsx";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

function App() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <SnackbarProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/page/:pageNumber" element={<MainPage />} />
            <Route path="/favoriteItems" element={<FavoritePage />} />
            <Route path="/item/:_id" element={<ItemPage />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
