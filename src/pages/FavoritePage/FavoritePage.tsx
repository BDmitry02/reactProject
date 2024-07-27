import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ItemSingleCard from "../../components/MainContentComponents/ItemSingleCard/ItemSingleCard";
import { fetchFav, selectAll } from "../../store/slices/LoginSlice";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SkeletonLoader from "../../components/MainContentComponents/Skeleton/Skeleton";
import { RootState } from "../../store/store";
import { getFavoriteItems } from "../../store/slices/productsSlice";
import { fetchProducts } from "../../store/slices/productsSlice";

const FavoritePage = React.memo(() => {
  console.log("render");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId, favLoadingStatus } = useSelector(
    (state: RootState) => state.login
  );
  const prodIds = useSelector((state: RootState) => selectAll(state));

  const { visibleItems, productsLoadingStatus } = useSelector(
    (state: RootState) => state.products
  );

  console.log(visibleItems);
  useEffect(() => {
    if (productsLoadingStatus != "loading") {
      if (productsLoadingStatus === "success") {
        if (userId) {
          dispatch(fetchFav(userId));
        }
      } else {
        dispatch(fetchProducts());
        console.log("product fetching");
      }
    }
  }, [userId, dispatch, productsLoadingStatus]);

  useEffect(() => {
    if (favLoadingStatus === "success") {
      dispatch(getFavoriteItems(prodIds));
    }
  }, [favLoadingStatus, prodIds, dispatch]);

  const SetContent = useCallback(() => {
    if (favLoadingStatus === "loading" || productsLoadingStatus === "loading") {
      return <SkeletonLoader />;
    } else if (favLoadingStatus === "error") {
      return (
        <div>
          <h2>Loading error</h2>
        </div>
      );
    } else if (favLoadingStatus === "success") {
      return visibleItems.length > 0 ? (
        visibleItems.map((product) => (
          <ItemSingleCard key={product._id} product={product} />
        ))
      ) : (
        <div>
          <h2>No favorite items found</h2>
        </div>
      );
    }
  }, [favLoadingStatus, productsLoadingStatus, visibleItems]);

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
