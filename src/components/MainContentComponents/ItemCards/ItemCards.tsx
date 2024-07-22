import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAll } from "../../../store/slices/productsSlice";

import useHttp from "../../../utils/useHttp/useHttp";

const ItemCards = () => {
  const { productsLoadingStatus } = useSelector((state) => state.products);
  const products = useSelector(selectAll);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchProducts(request));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (productsLoadingStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (productsLoadingStatus === "error") {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id}>{product.title}</div>
      ))}
    </div>
  );
};

export default ItemCards;
