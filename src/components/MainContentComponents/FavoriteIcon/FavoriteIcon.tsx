import { useAppDispatch, useAppSelector } from '../../../utils/store/hook';

import styled from 'styled-components';
import { useSnackbar } from 'notistack';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  addToFav,
  removeFromFav,
} from '../../../utils/store/slices/LoginSlice';

import { addNewFav, removeFav } from '../../../utils/store/slices/LoginSlice';

interface FavoriteProps {
  id: string;
}

const Favorite = ({ id }: FavoriteProps) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { favorites } = useAppSelector((state) => state.login);

  const toggleFav = async (e: React.MouseEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      enqueueSnackbar('User not logged in', { variant: 'error' });
      return;
    }

    try {
      if (favorites.includes(id)) {
        await dispatch(removeFromFav({ userId, prodId: id })).unwrap();
        await dispatch(removeFav(id));
        enqueueSnackbar('Removed from favorites!', { variant: 'success' });
      } else {
        await dispatch(addToFav({ userId, prodId: id })).unwrap();
        await dispatch(addNewFav(id));
        enqueueSnackbar('Added to favorites!', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error handling favorite action:', error);
      enqueueSnackbar('Failed to update favorites', { variant: 'error' });
    }
  };

  return (
    <StyledFavButton onClick={toggleFav}>
      {favorites.includes(id) ? (
        <StyledFavIcon />
      ) : (
        <StyledFavoriteBorderIcon />
      )}
    </StyledFavButton>
  );
};

export default Favorite;

const StyledFavButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

const StyledFavIcon = styled(FavoriteIcon)`
  color: #ffa900;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  color: #ffa900;
`;
