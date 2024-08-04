import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/store/hook';
import { useEffect, useMemo } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchSingleProduct } from '../../utils/store/slices/productsSlice';
import SingleItemContent from '../../components/SingleItemPageComponents/SingleItemContent';

function ItemPage() {
  const { _id } = useParams();
  const dispatch = useAppDispatch();

  const { visibleItems, singleProductLoadingStatus } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (_id) {
      dispatch(fetchSingleProduct(_id));
    }
  }, [dispatch, _id]);

  const loaderContent = useMemo(() => {
    if (singleProductLoadingStatus === 'loading') {
      return <p>....loading</p>;
    } else if (singleProductLoadingStatus === 'error') {
      return (
        <div>
          <h2>Loading error</h2>
        </div>
      );
    } else {
      return (
        <>
          <SingleItemContent product={visibleItems} />
        </>
      );
    }
  }, [singleProductLoadingStatus, visibleItems]);

  return (
    <StyledWrapper>
      <Header />
      <StyledMain>{loaderContent}</StyledMain>
      <Footer />
    </StyledWrapper>
  );
}

export default ItemPage;

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
