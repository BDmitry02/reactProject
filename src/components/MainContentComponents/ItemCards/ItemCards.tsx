import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../utils/store/hook';

import { fetchProducts } from '../../../utils/store/slices/productsSlice';
import ItemSingleCard from '../ItemSingleCard/ItemSingleCard';
import { SkeletonLoader } from '../Skeleton/Skeleton';
import { fetchFav } from '../../../utils/store/slices/LoginSlice';

function ItemCards() {
  const { productsLoadingStatus, visibleItems } = useAppSelector(
    (state) => state.products
  );
  const { userId } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productsLoadingStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsLoadingStatus]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFav(userId));
    }
  }, [userId, dispatch]);

  const setContent = useMemo(() => {
    if (productsLoadingStatus === 'loading') {
      return <SkeletonLoader />;
    } else if (productsLoadingStatus === 'error') {
      return (
        <div>
          <h2>Loading error</h2>
        </div>
      );
    } else {
      return (
        <>
          {visibleItems.map((product) => (
            <ItemSingleCard key={product._id} product={product} />
          ))}
        </>
      );
    }
  }, [productsLoadingStatus, visibleItems]);

  return (
    <div>
      <StyledItemCardsContainer>{setContent}</StyledItemCardsContainer>
    </div>
  );
}

export default ItemCards;

const StyledItemCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 30px;
  margin: 40px;

  @media (max-width: 768px) {
    margin: 10px;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 480px) {
  }
`;
