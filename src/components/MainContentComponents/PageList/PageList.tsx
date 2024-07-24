import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { selectAll, getPagedItems } from "../../../store/slices/productsSlice";

function PageList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const products = useSelector(selectAll);

  const itemsPerPage = 20;
  const pageCount = Math.floor(products.length / itemsPerPage);

  const changePage = (pageNum: number) => {
    setPage(pageNum);
    dispatch(getPagedItems(pageNum));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const getPageCount = () => {
    let pages = [];
    const maxPagesToShow = 7;
    const sidePagesToShow = 2;

    if (pageCount <= maxPagesToShow) {
      pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    } else {
      pages.push(1);

      if (page > sidePagesToShow + 1) {
        pages.push("prev-dots");
      }

      const start = Math.max(2, page - sidePagesToShow);
      const end = Math.min(pageCount - 1, page + sidePagesToShow);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < pageCount - sidePagesToShow) {
        pages.push("next-dots");
      }

      pages.push(pageCount);
    }

    return pages.map((p, index) => {
      if (p === "prev-dots") {
        return (
          <StyledPageButton
            key={index}
            onClick={() => changePage(page - 1 - sidePagesToShow)}
          >
            ...
          </StyledPageButton>
        );
      } else if (p === "next-dots") {
        return (
          <StyledPageButton
            key={index}
            onClick={() => changePage(page + 1 + sidePagesToShow)}
          >
            ...
          </StyledPageButton>
        );
      } else {
        return (
          <StyledPageButton
            key={index}
            onClick={() => changePage(+p)}
            disabled={p === page}
          >
            {p}
          </StyledPageButton>
        );
      }
    });
  };

  return <StyledPagesContainer>{getPageCount()}</StyledPagesContainer>;
}

export default PageList;

const StyledPageButton = styled.button`
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  width: 60px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: red;
  }

  &:disabled {
    border: 2px solid ${(props) => props.theme.textColor};
  }
`;

const StyledPagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 15px;
`;
