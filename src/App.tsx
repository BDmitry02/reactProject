import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "./store/store.ts";
import {
  lightTheme,
  darkTheme,
} from "./components/HeaderComponents/Theme/ThemeStyle.ts";
import PageList from "./components/MainContentComponents/PageList/PageList.tsx";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

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
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/page/:pageNumber" element={<PageList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
