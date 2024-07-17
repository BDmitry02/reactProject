import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";

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
    <StyledWrapper>
      <Header />
      <StyledMain />
      <Footer />
    </StyledWrapper>
  );
};

export default MainPage;
