import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

import styled from 'styled-components';
import { useAppSelector } from '../../utils/store/hook';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Theme from '../HeaderComponents/Theme/Theme';
import { lightTheme } from '../HeaderComponents/Theme/ThemeStyle';
import LanguagesList from '../HeaderComponents/LanguagesList/LanguagesList';
import DrawerList from '../HeaderComponents/DrawerList/DrawerList';
import SearchPanel from '../HeaderComponents/SearchPanel/SearchPanel';

function Header() {
  const [open, setOpen] = useState(false);

  const { userId } = useAppSelector((state) => state.login);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const HeaderMenu = () => {
    if (userId) {
      return (
        <>
          <StyledBurgerButton onClick={toggleDrawer(true)}>
            <StyledMenuOutlinedIcon fontSize="large" aria-label="open menu" />
          </StyledBurgerButton>
          <StyledMenuContainer open={open} onClose={toggleDrawer(false)}>
            <DrawerList toggleDrawer={toggleDrawer} />
          </StyledMenuContainer>
        </>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <StyledHeader>
      <HeaderMenu />
      {userId ? <SearchPanel /> : null}
      <StyledRightSideDiv>
        <Theme />
        <LanguagesList />
      </StyledRightSideDiv>
    </StyledHeader>
  );
}

export default Header;

const StyledRightSideDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const StyledHeader = styled.header`
  height: 70px;
  background-color: ${(props) => props.theme.headerAndFooterColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 30px;
  align-items: center;
`;

const StyledBurgerButton = styled.button`
  background-color: transparent;
  border: 0;

  &:hover {
    cursor: pointer;
  }
`;

const StyledMenuContainer = styled(Drawer)`
  & .MuiPaper-root {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColor};
  }
  &
    .MuiBox-root
    .MuiList-root
    .MuiListItem-root
    .MuiButtonBase-root
    .MuiListItemIcon-root {
    color: ${(props) => props.theme.textColor};
  }
`;

// const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlinedIcon)`
//   color: ${(props) =>
//     props.theme.backgroundColor === lightTheme.backgroundColor
//       ? "#000"
//       : "#fff"};
// `;
const StyledMenuOutlinedIcon = styled(MenuOutlinedIcon)`
  color: ${(props) =>
    props.theme.backgroundColor === lightTheme.backgroundColor
      ? '#000'
      : '#fff'};
`;
