import styled from "styled-components";

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

export const StyledButton = styled.button`
  background-color: transparent;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;
