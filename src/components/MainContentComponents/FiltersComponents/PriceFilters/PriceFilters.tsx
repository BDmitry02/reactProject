import styled from "styled-components";
import { useSelector } from "react-redux";

import { RootState } from "../../../../store/store";

type PriceFilterProps = {
  filterPrice: {
    min: number;
    max: number;
  };
  isPriceValid: boolean;
  setFilterPrice: (arg0: { min: number; max: number }) => void;
  setIsValidPrice: (arg0: boolean) => void;
};

function PriceFilter(props: PriceFilterProps) {
  console.log("PriceFilter render");

  const { setFilterPrice, filterPrice, isPriceValid, setIsValidPrice } = props;

  const { filtersPriceLoadingStatus, priceFilter } = useSelector(
    (state: RootState) => state.filters
  );

  const PriceFilterChanged = (e) => {
    const { name, value } = e.target;
    if (!/^\d*$/.test(value)) {
      return;
    }

    const numericValue = value === "" ? 0 : parseInt(value); // Обработка пустой строки
    const updatedFilterPrice = {
      ...filterPrice,
      [name]: numericValue,
    };

    setFilterPrice(updatedFilterPrice);

    const isValidPrice =
      updatedFilterPrice.min <= updatedFilterPrice.max &&
      updatedFilterPrice.min >= priceFilter.min &&
      updatedFilterPrice.max <= priceFilter.max;

    setIsValidPrice(isValidPrice);
  };

  if (filtersPriceLoadingStatus === "success") {
    return (
      <StyledPriceFilterContainer>
        <StyledPriceFilterInput
          type="text"
          name="min"
          onChange={PriceFilterChanged}
          value={filterPrice.min}
          $isInvalid={!isPriceValid}
          autoComplete="off"
        />
        <p>-</p>
        <StyledPriceFilterInput
          type="text"
          name="max"
          onChange={PriceFilterChanged}
          value={filterPrice.max}
          $isInvalid={!isPriceValid}
          autoComplete="off"
        />
      </StyledPriceFilterContainer>
    );
  } else {
    return null;
  }
}

export default PriceFilter;

const StyledPriceFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const StyledPriceFilterInput = styled.input<{ $isInvalid: boolean }>`
  max-width: 80px;
  height: 30px;
  border: 1px solid ${({ $isInvalid }) => ($isInvalid ? "red" : "#ccc")};
  text-align: center;
  border-radius: 15px;

  &:focus {
    border-color: ${({ $isInvalid }) => ($isInvalid ? "darkred" : "#007bff")};
    box-shadow: 0 0 5px
      ${({ $isInvalid }) => ($isInvalid ? "darkred" : "#007bff")};
    outline: none;
  }
`;
