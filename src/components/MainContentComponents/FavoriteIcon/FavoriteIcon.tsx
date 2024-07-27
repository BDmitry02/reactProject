import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
import styled from "styled-components";
import { useSnackbar } from "notistack";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToFav, removeFromFav } from "../../../store/slices/LoginSlice";

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
  const { enqueueSnackbar } = useSnackbar();

  // memorizing the selector to decrease the render
  const selectIsFavorite = useMemo(() => {
    return createSelector(
      (state: RootState) => selectAll(state),
      (favIds) => favIds.includes(id)
    );
  }, [id]);

  const isFavorite = useSelector((state: RootState) => selectIsFavorite(state));

  const toggleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (isFavorite) {
        await dispatch(
          removeFromFav({ userId: localStorage.getItem("userId"), prodId: id })
        ).unwrap();
        await dispatch(removeFav(id));
        enqueueSnackbar("Removed from favorites!", { variant: "success" });
      } else {
        await dispatch(
          addToFav({ userId: localStorage.getItem("userId"), prodId: id })
        ).unwrap();
        await dispatch(addNewFav(id));
        enqueueSnackbar("Added to favorites!", { variant: "success" });
      }
    } catch (error) {
      console.error("Error handling favorite action:", error);
      enqueueSnackbar("Failed to update favorites", { variant: "error" });
    }
  };

  return (
    <StyledFavButton onClick={toggleFav}>
      {isFavorite ? <StyledFavIcon /> : <StyledFavoriteBorderIcon />}
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
