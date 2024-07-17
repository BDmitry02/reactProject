import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledImg = styled.img`
  width: 40px;
`;

export const StyledHeader = styled.header`
  height: 90px;
  background-color: #40e0d0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: black;

  &:hover {
    color: lightgray;
  }
`;

export const StyledButton = styled.button`
  background-color: transparent;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;
