import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { selectAll } from "../../../../store/slices/FiltersSlice";

type CategoryFilterProps = {
  filterCategory: string;
  setFilterCategory: (arg0: string) => void;
};

function CategoryFilter(props: CategoryFilterProps) {
  console.log("CategoryFilter render");
  const { filterCategory, setFilterCategory } = props;
  const categories = useSelector((state: RootState) => selectAll(state));

  const { filtersCategoriesLoadingStatus } = useSelector(
    (state: RootState) => state.filters
  );

  if (filtersCategoriesLoadingStatus === "success") {
    return (
      <>
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

  &:disabled {
    border: 2px solid ${(props) => props.theme.textColor};
  }
`;
