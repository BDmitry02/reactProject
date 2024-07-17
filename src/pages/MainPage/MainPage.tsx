import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import styled from "styled-components";

const MainPage = () => {
  const StyledWrapper = styled.div`
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  `;
  const StyledMain = styled.main`
    flex: 1 1 auto;
  `;

  return (
    <StyledWrapper>
      <Header />
      <StyledMain>
        <div></div>
      </StyledMain>
      <Footer />
    </StyledWrapper>
  );
};

export default MainPage;
