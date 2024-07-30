import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { RootState } from '../../utils/store/store';
import { fetchSingleProduct } from '../../utils/store/slices/productsSlice';
import SingleItemContent from '../../components/SingleItemPageComponents/SingleItemContent';

function ItemPage() {
  const { _id } = useParams<{ _id: string }>();
  const dispatch = useDispatch();

  const { visibleItems, singleProductLoadingStatus } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchSingleProduct(_id));
  }, [dispatch, _id]);

  const SetContent = () => {
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
  };

  return (
    <StyledWrapper>
      <Header />
      <StyledMain>{SetContent()}</StyledMain>
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
