import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import PriceFilter from "../PriceFilters/PriceFilters";
import CategoryFilter from "../CategoryFilters/CategoryFilters";

import {
  fetchCategories,
  fetchPriceFilter,
} from "../../../../store/slices/FiltersSlice";

function Filters() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [filterCategory, setFilterCategory] = useState("");
  const [filterPrice, setFilterPrice] = useState({
    min: 0,
    max: 0,
  });
  const [isPriceValid, setIsValidPrice] = useState(true);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPriceFilter()).then((action) =>
      setFilterPrice({
        min: parseInt(action.payload.min),
        max: parseInt(action.payload.max),
      })
    );
  }, [dispatch]);

  return (
    <StyledFilterContainer>
      <StyledCategoriesContainer>
        <CategoryFilter
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
        />
        <PriceFilter
          setFilterPrice={setFilterPrice}
          filterPrice={filterPrice}
          isPriceValid={isPriceValid}
          setIsValidPrice={setIsValidPrice}
        />
      </StyledCategoriesContainer>
    </StyledFilterContainer>
  );
}

export default Filters;

const StyledFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  margin-top: 40px;
`;

const StyledCategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
