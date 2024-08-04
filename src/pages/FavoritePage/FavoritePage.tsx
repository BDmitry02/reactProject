import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/store/hook';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import ItemSingleCard from '../../components/MainContentComponents/ItemSingleCard/ItemSingleCard';
import { fetchFav } from '../../utils/store/slices/LoginSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { SkeletonLoader } from '../../components/MainContentComponents/Skeleton/Skeleton';
import {
  getFavoriteItems,
  resetFav,
} from '../../utils/store/slices/productsSlice';
import { fetchProducts } from '../../utils/store/slices/productsSlice';

const FavoritePage = React.memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userId, favLoadingStatus, favorites } = useAppSelector(
    (state) => state.login
  );

  const { visibleItems, productsLoadingStatus, allItemsLoaded } =
    useAppSelector((state) => state.products);
  useEffect(() => {
    if (productsLoadingStatus != 'loading') {
      if (productsLoadingStatus === 'success') {
        if (userId) {
          dispatch(fetchFav(userId));
        }
      } else {
        dispatch(fetchProducts());
      }
    }
  }, [userId, dispatch, productsLoadingStatus]);

  useEffect(() => {
    if (favLoadingStatus === 'success') {
      dispatch(resetFav());
      dispatch(getFavoriteItems(favorites));
    }
  }, [favLoadingStatus, favorites, dispatch]);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (!allItemsLoaded) {
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        dispatch(getFavoriteItems(favorites));
      }
    }
  }, [dispatch, favorites, allItemsLoaded]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const setContent = useMemo(() => {
    if (favLoadingStatus === 'loading' || productsLoadingStatus === 'loading') {
      return <SkeletonLoader />;
    } else if (favLoadingStatus === 'error') {
      return (
        <div>
          <StyledStatusHeader>Loading error</StyledStatusHeader>
        </div>
      );
    } else if (favLoadingStatus === 'success') {
      return visibleItems.length > 0 ? (
        visibleItems.map((product) => (
          <ItemSingleCard key={product._id} product={product} />
        ))
      ) : (
        <div>
          <StyledStatusHeader>No favorite items found</StyledStatusHeader>
        </div>
      );
    }
  }, [favLoadingStatus, productsLoadingStatus, visibleItems]);

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="FavoriteItems" content="Favorite items" />
        <title>Favorite items</title>
      </Helmet>
      <StyledWrapper>
        <Header />
        <StyledMain>
          <StyledFavoriteHeader>{t('favItems')}</StyledFavoriteHeader>
          <StyledItemCardsContainer>{setContent}</StyledItemCardsContainer>
        </StyledMain>
        <Footer />
      </StyledWrapper>
    </HelmetProvider>
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

  @media (max-width: 768px) {
    margin: 0px;
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const StyledStatusHeader = styled.h2`
  text-align: center;
`;

const StyledFavoriteHeader = styled.h1`
  text-align: center;
`;
