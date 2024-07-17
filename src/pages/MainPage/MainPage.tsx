import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";

const StyledWrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const StyledMain = styled.main`
  flex: 1 1 auto;
`;

const MainPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="MainPage" content="Main page" />
        <title>Main Page</title>
      </Helmet>
      <StyledWrapper>
        <Header />
        <StyledMain />
        <Footer />
      </StyledWrapper>
    </HelmetProvider>
  );
};

export default MainPage;
