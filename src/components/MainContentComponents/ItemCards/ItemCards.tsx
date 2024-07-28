import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/slices/productsSlice";

import ItemSingleCard from "../ItemSingleCard/ItemSingleCard";
import SkeletonLoader from "../Skeleton/Skeleton";
import { RootState } from "../../../store/store";
import { fetchFav } from "../../../store/slices/LoginSlice";

function ItemCards() {
  const { productsLoadingStatus, visibleItems } = useSelector(
    (state: RootState) => state.products
  );
  const { userId } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productsLoadingStatus === "idle") {
      dispatch(fetchProducts());
      if (userId) {
        dispatch(fetchFav(userId));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);

  const SetContent = () => {
    if (productsLoadingStatus === "loading") {
      return <SkeletonLoader />;
    } else if (productsLoadingStatus === "error") {
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
  };

  return (
    <div>
      <StyledItemCardsContainer>{SetContent()}</StyledItemCardsContainer>
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
`;
