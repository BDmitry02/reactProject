import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Theme from "../MainPageComponents/Theme/Theme";
import { lightTheme } from "../MainPageComponents/Theme/ThemeStyle";
import { RootState } from "../../store/store";

function Header() {
  const [open, setOpen] = useState(false);

  const isLogged = useSelector((state: RootState) => state.login.isLogged);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const HeaderMenu = () => {
    if (isLogged) {
      return (
        <>
          <StyledBurgerButton onClick={toggleDrawer(true)}>
            <StyledMenuOutlinedIcon fontSize="large" />
          </StyledBurgerButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <StyledHeader>
      <HeaderMenu />
      <StyledRightSideDiv>
        <Theme />
        {/* <Link to={"/login"}>
          <StyledAccountCircleOutlinedIcon fontSize="large" />
        </Link> */}
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
  height: 90px;
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

// const StyledAccountCircleOutlinedIcon = styled(AccountCircleOutlinedIcon)`
//   color: ${(props) =>
//     props.theme.backgroundColor === lightTheme.backgroundColor
//       ? "#000"
//       : "#fff"};
// `;
const StyledMenuOutlinedIcon = styled(MenuOutlinedIcon)`
  color: ${(props) =>
    props.theme.backgroundColor === lightTheme.backgroundColor
      ? "#000"
      : "#fff"};
`;
