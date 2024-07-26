import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import styled from "styled-components";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  selectAll,
  addNewFav,
  removeFav,
} from "../../../store/slices/LoginSlice";
import { RootState } from "../../../store/store";

type FavoriteProps = {
  id: string;
};

const Favorite = ({ id }: FavoriteProps) => {
  const dispatch = useDispatch();

  // Мемоизация селектора для уменьшения количества рендеров
  const selectIsFavorite = useMemo(() => {
    return createSelector(
      (state: RootState) => selectAll(state),
      (favIds) => favIds.includes(id)
    );
  }, [id]);

  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state));

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFav(id));
    } else {
      dispatch(addNewFav(id));
    }
  };

  return (
    <StyledFavButton onClick={toggleFav}>
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </StyledFavButton>
  );
};

export default Favorite;

const StyledFavButton = styled.button`
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;
