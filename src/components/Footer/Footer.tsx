import styled from 'styled-components';

const Footer = () => {
  return <StyledFooter />;
};

export default Footer;

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.headerAndFooterColor};
  color: ${(props) => props.theme.textColor};
  height: 70px;
`;
