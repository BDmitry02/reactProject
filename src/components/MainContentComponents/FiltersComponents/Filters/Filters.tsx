import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getFilteredItems,
  resetFilters,
} from "../../../../utils/store/slices/productsSlice";
import PriceFilter from "../PriceFilters/PriceFilters";
import CategoryFilter from "../CategoryFilters/CategoryFilters";

import {
  fetchCategories,
  fetchPriceFilter,
} from "../../../../utils/store/slices/FiltersSlice";

function Filters() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [filterCategory, setFilterCategory] = useState("all");
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

  const getFiltered = () => {
    dispatch(getFilteredItems({ category: filterCategory, ...filterPrice }));
  };

  const resFilters = () => {
    dispatch(resetFilters());
  };

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
        <StyledFilterButton onClick={getFiltered} disabled={!isPriceValid}>
          {t("getFiltered")}
        </StyledFilterButton>
        <StyledFilterButton onClick={resFilters}>
          {" "}
          {t("resetFilters")}
        </StyledFilterButton>
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

const StyledFilterButton = styled.button`
  height: 30px;
  color: ${(props) => props.theme.textColor};
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) =>
      props.theme.textColor === "#FFFFFF" ? "#000" : "#fff"};
  }
`;
