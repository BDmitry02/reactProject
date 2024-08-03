import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../../utils/store/store';
import { getSearchedItem } from '../../../utils/store/slices/productsSlice';
import SearchItemCard from '../SearchItemCard/SearchItemCard';
import {
  displaySearchResults,
  getPagedItems,
} from '../../../utils/store/slices/productsSlice';
import { useNavigate } from 'react-router-dom';

function SearchPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const { searchedProducts } = useSelector(
    (state: RootState) => state.products
  );

  const handleChange = (e: { target: { value: string } }) => {
    if (!isSearchActive) {
      setIsSearchActive(true);
    }
    const value = e.target.value;
    setSearch(() => value);
    dispatch(getSearchedItem(value));
  };

  const handleBlur = () => {
    setIsSearchActive(false);
  };

  const clickedSearch = () => {
    if (search != '') {
      setIsSearchActive(true);
    }
  };

  const getSearched = () => {
    dispatch(displaySearchResults());
    dispatch(getPagedItems(1));
    setIsSearchActive(false);
    navigate('/searchResults');
  };

  const workingSearchPanel = () => {
    const searchingResults = () => {
      if (searchedProducts.length === 0) {
        return <StyledSearchedItem>No items found</StyledSearchedItem>;
      } else if (search.length > 0) {
        return searchedProducts
          .slice(0, 8)
          .map((product) => (
            <SearchItemCard key={product._id} product={product} />
          ));
      }
    };

    if (isSearchActive) {
      return (
        <>
          <StyledOverlay onClick={handleBlur} />
          <StyledSearchedItemsContainer>
            {searchingResults()}
          </StyledSearchedItemsContainer>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <StyledSearchContainer>
      <StyledSearchInput
        type="text"
        autoComplete="off"
        placeholder={t('searchPanelPlaceholder')}
        value={search}
        onChange={handleChange}
        onClick={clickedSearch}
      />
      <StyledFindButton onClick={getSearched}>
        {t('findButton')}
      </StyledFindButton>
      {workingSearchPanel()}
    </StyledSearchContainer>
  );
}

export default SearchPanel;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
const StyledSearchInput = styled.input`
  width: 600px;
  height: 35px;

  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 10px;
  border: 0;
  position: relative;
  z-index: 5;

  &:focus {
    border: none;
    outline: none;
  }
  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 632px;

  @media (max-width: 768px) {
    width: 250px;
  }
`;

const StyledSearchedItemsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0%;
  width: calc(100% - 64px);
  background-color: #ffffff;
  z-index: 5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;

  @media (max-width: 768px) {
    width: calc(100% - 49px);
    left: -0.5%;
  }
`;

const StyledSearchedItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

const StyledFindButton = styled.button`
  border: 1px solid black;
  background-color: white;
  height: 39px;
  width: 70px;
  z-index: 5;
  cursor: pointer;

  @media (max-width: 480px) {
    display: none;
  }
`;
