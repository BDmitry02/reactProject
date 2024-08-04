import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../utils/store/hook';
import { useTranslation } from 'react-i18next';

import { SkeletonFilters } from '../../Skeleton/Skeleton';
import SortingFilters from '../SortingFilters/SortingFilters';

import {
  getFilteredItems,
  resetFilters,
  getPagedItems,
} from '../../../../utils/store/slices/productsSlice';
import PriceFilter from '../PriceFilters/PriceFilters';
import CategoryFilter from '../CategoryFilters/CategoryFilters';

import {
  fetchCategories,
  fetchPriceFilter,
} from '../../../../utils/store/slices/FiltersSlice';
import { useNavigate } from 'react-router-dom';

function Filters() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [filterCategory, setFilterCategory] = useState('all');

  const [isPriceValid, setIsValidPrice] = useState(true);

  const [sortBy, setSortBy] = useState('null');

  const { filtersPriceLoadingStatus, priceFilter } = useAppSelector(
    (state) => state.filters
  );

  const [filterPrice, setFilterPrice] = useState(priceFilter);

  useEffect(() => {
    setFilterPrice(priceFilter);
  }, [priceFilter]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPriceFilter());
  }, [dispatch]);

  const getFiltered = () => {
    if (
      !(
        filterPrice.min === priceFilter.min &&
        filterPrice.max === priceFilter.max &&
        filterCategory == 'all'
      )
    ) {
      dispatch(getFilteredItems({ category: filterCategory, ...filterPrice }));
      dispatch(getPagedItems(1));
      navigate('/page/1');
      setSortBy('null');
    }
  };

  const resFilters = () => {
    if (
      !(
        filterPrice.min === priceFilter.min &&
        filterPrice.max === priceFilter.max &&
        filterCategory == 'all'
      )
    ) {
      dispatch(resetFilters());
      setFilterPrice(priceFilter);
      setSortBy('null');
      setFilterCategory('all');
      dispatch(getPagedItems(1));
      navigate('/page/1');
    }
  };

  if (filtersPriceLoadingStatus != 'success') {
    return (
      <>
        <SkeletonFilters />
      </>
    );
  } else {
    return (
      <StyledFilterContainer>
        <SortingFilters sortBy={sortBy} setSortBy={setSortBy} />
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
            {t('getFiltered')}
          </StyledFilterButton>
          <StyledFilterButton onClick={resFilters}>
            {' '}
            {t('resetFilters')}
          </StyledFilterButton>
        </StyledCategoriesContainer>
      </StyledFilterContainer>
    );
  }
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
      props.theme.textColor === '#FFFFFF' ? '#000' : '#fff'};
  }
`;
