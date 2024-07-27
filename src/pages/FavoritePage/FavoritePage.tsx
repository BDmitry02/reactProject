import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ItemSingleCard from "../../components/MainContentComponents/ItemSingleCard/ItemSingleCard";
import {
  fetchFav,
  fetchFavoriteItems,
  selectAll,
} from "../../store/slices/LoginSlice";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SkeletonLoader from "../../components/MainContentComponents/Skeleton/Skeleton";

const FavoritePage = React.memo(() => {
  console.log("render");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId, favLoadingStatus, favProdLoadingStatus, favoriteItems } =
    useSelector((state) => state.login);
  const favItems = useSelector((state) => selectAll(state));

  useEffect(() => {
    if (userId) {
      dispatch(fetchFav(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (favLoadingStatus === "success" && favItems.length > 0) {
      dispatch(fetchFavoriteItems(favItems));
    }
  }, [favLoadingStatus, favItems, dispatch]);

  const SetContent = useCallback(() => {
    if (favProdLoadingStatus === "loading") {
      return <SkeletonLoader />;
    } else if (favProdLoadingStatus === "error") {
      return (
        <div>
          <h2>Loading error</h2>
        </div>
      );
    } else if (
      favLoadingStatus === "success" &&
      favProdLoadingStatus === "success"
    ) {
      return favoriteItems.length > 0 ? (
        favoriteItems.map((product) => (
          <ItemSingleCard key={product._id} product={product} />
        ))
      ) : (
        <div>
          <h2>No favorite items found</h2>
        </div>
      );
    }
  }, [favoriteItems, favLoadingStatus, favProdLoadingStatus]);

  return (
    <StyledWrapper>
      <Header />
      <StyledMain>
        <h1 style={{ textAlign: "center" }}>{t("favItems")}</h1>
        <StyledItemCardsContainer>{SetContent()}</StyledItemCardsContainer>
      </StyledMain>
      <Footer />
    </StyledWrapper>
  );
});

export default FavoritePage;

const StyledWrapper = styled.div`
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
`;

const StyledItemCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 30px;
  margin: 40px;
`;
