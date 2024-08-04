import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../../../utils/store/hook';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from '../../../utils/store/slices/LoginSlice';

type DrawerListProps = {
  toggleDrawer: (newOpen: boolean) => void;
};

function DrawerList({ toggleDrawer }: DrawerListProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <StyledMenuContainer
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <StyledMenuItem to={'/page/1'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={t('homePage')} />
          </StyledMenuItem>
        </ListItem>

        <ListItem disablePadding>
          <StyledMenuItem to={'/favoriteItems'}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary={t('favItems')} />
          </StyledMenuItem>
        </ListItem>

        <ListItem disablePadding>
          <StyledMenuItem to={'/'} onClick={() => dispatch(logOut())}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={t('logOut')} />
          </StyledMenuItem>
        </ListItem>
      </List>
    </StyledMenuContainer>
  );
}

export default DrawerList;

const StyledMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0px 10px 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 40px;
  text-decoration: none;
  color: ${(props) => props.theme.textColor};

  & .MuiListItemIcon-root {
    color: ${(props) => props.theme.textColor};
  }

  &:hover {
    background-color: gray;
  }
`;

const StyledMenuContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;
