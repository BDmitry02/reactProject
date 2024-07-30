import { Link } from 'react-router-dom';
import styled from 'styled-components';

type SearchItemCardProps = {
  product: {
    _id: string;
    title: string;
    price: string | number;
    description: string;
    previewImage: string;
    bigImage: string;
    category: string;
  };
};

function SearchItemCard({ product }: SearchItemCardProps) {
  const { title, previewImage, price, _id } = product;

  return (
    <StyledLink to={`/item/${_id}`}>
      <StyledSearchItemContainer>
        <img src={previewImage} alt={title} />
        <p>{title}</p>
        <StyledPrice>${price}</StyledPrice>
      </StyledSearchItemContainer>
    </StyledLink>
  );
}
export default SearchItemCard;

const StyledSearchItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 0px 20px;

  & img {
    width: 40px;
  }
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const StyledPrice = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
