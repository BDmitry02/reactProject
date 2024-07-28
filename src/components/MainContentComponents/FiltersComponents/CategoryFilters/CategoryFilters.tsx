import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store/store";
import { selectAll } from "../../../../utils/store/slices/FiltersSlice";
import { useTranslation } from "react-i18next";

type CategoryFilterProps = {
  filterCategory: string;
  setFilterCategory: (arg0: string) => void;
};

function CategoryFilter(props: CategoryFilterProps) {
  const { t } = useTranslation();
  const { filterCategory, setFilterCategory } = props;
  const categories = useSelector((state: RootState) => selectAll(state));

  const { filtersCategoriesLoadingStatus } = useSelector(
    (state: RootState) => state.filters
  );

  if (filtersCategoriesLoadingStatus === "success") {
    return (
      <>
        <StyledCategoryHeader>{t("filterCategory")}</StyledCategoryHeader>
        {categories.map((category) => {
          return (
            <StyledCategoryButton
              key={category}
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
      props.theme.textColor === "#FFFFFF" ? "#000" : "#fff"};
  }

  &:disabled {
    border: 3px solid ${(props) => props.theme.textColor};
  }
`;

const StyledCategoryHeader = styled.p`
  font-size: 20px;
  margin: 0;
`;
