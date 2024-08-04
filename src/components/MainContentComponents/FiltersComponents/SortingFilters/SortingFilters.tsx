import styled from 'styled-components';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  sortProducts,
  getPagedItems,
} from '../../../../utils/store/slices/productsSlice';
import { useAppDispatch } from '../../../../utils/store/hook';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type SortingFiltersProps = {
  sortBy: string;
  setSortBy: (value: string) => void;
};

function SortingFilters({ sortBy, setSortBy }: SortingFiltersProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const changeSorting = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    dispatch(sortProducts(sortBy));
    dispatch(getPagedItems(1));
  }, [sortBy, dispatch]);

  return (
    <>
      <StyledSortingHeader>{t('filterSort')}</StyledSortingHeader>
      <StyledSelectFilter sx={{ m: 1, maxWidth: 160 }}>
        <Select
          value={sortBy}
          onChange={changeSorting}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="null">
            <em>Нет</em>
          </MenuItem>
          <MenuItem value={'priceAscending'}>
            {t('filterFromLowToHigh')}
          </MenuItem>
          <MenuItem value={'priceDescending'}>
            {t('filterFromHighToLow')}
          </MenuItem>
          <MenuItem value={'fromAtoZ'}>{t('filterAtoZ')}</MenuItem>
          <MenuItem value={'fromZtoA'}>{t('filterZtoA')}</MenuItem>
        </Select>
      </StyledSelectFilter>
      <StyledSortContainer></StyledSortContainer>
    </>
  );
}

export default SortingFilters;

const StyledSortContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledSortingHeader = styled.p`
  font-size: 20px;
  margin: 0;
`;

const StyledSelectFilter = styled(FormControl)`
  & .MuiInputBase-root {
    color: ${(props) => props.theme.textColor};

    & .MuiSvgIcon-root {
      color: ${(props) => props.theme.textColor};
    }
  }
`;
