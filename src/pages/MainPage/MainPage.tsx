import styled from "styled-components";
import { useCallback } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import LoginPageForm from "../../components/LoginPageForm/LoginPageForm";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ItemCards from "../../components/MainContentComponents/ItemCards/ItemCards";
import PageList from "../../components/MainContentComponents/PageList/PageList";

function MainPage() {
  const isLogged = useSelector((state: RootState) => state.login.isLogged);

  const MainContent = useCallback(() => {
    if (isLogged) {
      return (
        <>
          <ItemCards />
          <PageList />
        </>
      );
    } else {
      return <LoginPageForm />;
    }
  }, [isLogged]);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="MainPage" content="Main page" />
        <title>Main Page</title>
      </Helmet>
      <StyledWrapper>
        <Header />
        <StyledMain>
          <MainContent />
        </StyledMain>
        <Footer />
      </StyledWrapper>
    </HelmetProvider>
  );
}

export default MainPage;

const StyledWrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const StyledMain = styled.main`
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;
