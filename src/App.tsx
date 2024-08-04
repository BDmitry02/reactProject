import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useAppSelector } from './utils/store/hook.ts';
import { SnackbarProvider } from 'notistack';
import {
  lightTheme,
  darkTheme,
} from './components/HeaderComponents/Theme/ThemeStyle.ts';
import MainPage from './pages/MainPage/MainPage';
import FavoritePage from './pages/FavoritePage/FavoritePage.tsx';
import ItemPage from './pages/ItemPage/ItemPage.tsx';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    margin: 0;
    padding: 0;
  }
`;

function App() {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <SnackbarProvider>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/page/:pageNumber" element={<MainPage />} />
            <Route path="/favoriteItems" element={<FavoritePage />} />
            <Route path="/item/:_id" element={<ItemPage />} />
            <Route path="/searchResults" element={<MainPage />} />
            <Route path="/searchResults/:pageNumber" element={<MainPage />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
