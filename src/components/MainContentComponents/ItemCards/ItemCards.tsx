import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/slices/productsSlice";
import useHttp from "../../../utils/useHttp/useHttp";
import ItemSingleCard from "../ItemSingleCard/ItemSingleCard";
import SkeletonLoader from "../Skeleton/Skeleton";

const ItemCards = () => {
  const { productsLoadingStatus, visibleItems } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchProducts(request));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(productsLoadingStatus);

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
            <ItemSingleCard key={product._id} props={product} />
          ))}
        </>
      );
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Products</h1>
      <StyledItemCardsContainer>{SetContent()}</StyledItemCardsContainer>
    </div>
  );
};

export default ItemCards;

const StyledItemCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  align-items: center;
  gap: 30px;
  margin: 40px;
`;
