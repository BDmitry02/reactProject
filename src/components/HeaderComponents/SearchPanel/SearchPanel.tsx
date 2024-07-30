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

function SearchPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
  };

  const WorkingSearchPanel = () => {
    const searchingResults = () => {
      if (searchedProducts.length === 0) {
        return <StyledSearchedItem>No items found</StyledSearchedItem>;
      } else if (search.length > 0) {
        return searchedProducts
          .slice(0, 8)
          .map((product, index) => (
            <SearchItemCard key={index} product={product} />
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
      {WorkingSearchPanel()}
    </StyledSearchContainer>
  );
}

export default SearchPanel;

const searchIconSVG = `
<svg fill='%234E4C4C' height='18' viewBox='0 0 24 24' width='18 ' xmlns='http://www.w3.org/2000/svg'><path clip-rule='evenodd' d='m10 2c-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8 1.8487 0 3.551-.6271 4.9056-1.6801l5.3873 5.3872c.3905.3905 1.0237.3905 1.4142 0s.3905-1.0237 0-1.4142l-5.3872-5.3873c1.053-1.3546 1.6801-3.0569 1.6801-4.9056 0-4.41828-3.5817-8-8-8zm-6 8c0-3.31371 2.68629-6 6-6 3.3137 0 6 2.68629 6 6 0 3.3137-2.6863 6-6 6-3.31371 0-6-2.6863-6-6z' /></svg>
`;

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
  background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
    searchIconSVG
  )}');

  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 30px;
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
