import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPagedItems,
  resetFilters,
} from '../../../utils/store/slices/productsSlice';
import { Link } from 'react-router-dom';
import { RootState } from '../../../utils/store/store';
import { useLocation } from 'react-router-dom';

function PageList() {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState<string>('');
  const { filteredItems, productsLoadingStatus } = useSelector(
    (state: RootState) => state.products
  );
  const { pageNumber } = useParams<{ pageNumber?: string }>();
  const dispatch = useDispatch();

  const pageNum = pageNumber ? parseInt(pageNumber, 10) : 1;
  const [page, setPage] = useState(pageNum);
  const pageCount = Math.ceil(filteredItems.length / 20);

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (productsLoadingStatus === 'success') {
      if (
        previousPath.startsWith('/searchResults') &&
        !location.pathname.startsWith('/searchResults')
      ) {
        dispatch(resetFilters());
      }
    }
  }, [location.pathname, previousPath, productsLoadingStatus, dispatch]);

  useEffect(() => {
    if (productsLoadingStatus === 'success') {
      if (pageNumber === undefined) {
        setPage(1);
        dispatch(getPagedItems(1));
      } else {
        setPage(pageNum);
        dispatch(getPagedItems(pageNum));
      }
    }
  }, [pageNumber, pageNum, productsLoadingStatus, dispatch]);

  const changePage = (pageNum: number) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPath = (basePath: string, page: number) => {
    return basePath.startsWith('/searchResults') ||
      basePath === '/searchResults'
      ? `/searchResults/${page}`
      : `/page/${page}`;
  };

  const getPageCount = () => {
    if (pageCount > 1) {
      let pages = [];
      const maxPagesToShow = 7;
      const sidePagesToShow = 2;

      if (pageCount <= maxPagesToShow) {
        pages = Array.from({ length: pageCount }, (_, index) => index + 1);
      } else {
        pages.push(1);

        if (page > sidePagesToShow + 1) {
          pages.push('prev-dots');
        }

        const start = Math.max(2, page - sidePagesToShow);
        const end = Math.min(pageCount - 1, page + sidePagesToShow);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }

        if (page < pageCount - sidePagesToShow) {
          pages.push('next-dots');
        }

        pages.push(pageCount);
      }

      return pages.map((p, index) => {
        if (p === 'prev-dots') {
          const prevPath = getPath(
            location.pathname,
            page - 1 - sidePagesToShow
          );
          return (
            <StyledPageButton
              to={prevPath}
              key={index}
              onClick={() => changePage(page - 1 - sidePagesToShow)}
            >
              ...
            </StyledPageButton>
          );
        } else if (p === 'next-dots') {
          const nextPath = getPath(location.pathname, page + sidePagesToShow);
          return (
            <StyledPageButton
              to={nextPath}
              key={index}
              onClick={() => changePage(page + sidePagesToShow)}
            >
              ...
            </StyledPageButton>
          );
        } else {
          const path = getPath(location.pathname, p);
          return (
            <StyledPageButton
              to={path}
              key={index}
              className={p === page ? 'disabled' : undefined}
              onClick={p === page ? undefined : () => changePage(+p)}
            >
              {p}
            </StyledPageButton>
          );
        }
      });
    }
  };

  return <StyledPagesContainer>{getPageCount()}</StyledPagesContainer>;
}

export default PageList;

const StyledPageButton = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.textColor};
  background-color: transparent;
  color: ${(props) => props.theme.textColor};
  width: 60px;
  height: 30px;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: red;
  }

  &.disabled {
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
