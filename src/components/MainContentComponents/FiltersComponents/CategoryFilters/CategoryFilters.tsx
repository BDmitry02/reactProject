import styled from 'styled-components';
import { useAppSelector } from '../../../../utils/store/hook';
import { useTranslation } from 'react-i18next';

interface CategoryFilterProps {
  filterCategory: string;
  setFilterCategory: (category: string) => void;
}

function CategoryFilter(props: CategoryFilterProps) {
  const { t } = useTranslation();
  const { filterCategory, setFilterCategory } = props;
  const { categoryFilter, filtersCategoriesLoadingStatus } = useAppSelector(
    (state) => state.filters
  );

  if (filtersCategoriesLoadingStatus === 'success') {
    return (
      <>
        <StyledCategoryHeader>{t('filterCategory')}</StyledCategoryHeader>
        {categoryFilter.map((category, index) => {
          return (
            <StyledCategoryButton
              key={index}
              onClick={() => setFilterCategory(category)}
              disabled={filterCategory === category}
            >
              {category}
            </StyledCategoryButton>
          );
        })}
      </>
    );
  } else {
    return null;
  }
}

export default CategoryFilter;

const StyledCategoryButton = styled.button`
  background-color: transparent;
  height: 50px;
  border: 1px solid ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) =>
      props.theme.textColor === '#FFFFFF' ? '#000' : '#fff'};
  }

  &:disabled {
    border: 3px solid ${(props) => props.theme.textColor};
  }

  @media (max-width: 768px) {
    width: 150px;
  }

  @media (max-width: 480px) {
  }
`;

const StyledCategoryHeader = styled.p`
  font-size: 20px;
  margin: 0;
`;
