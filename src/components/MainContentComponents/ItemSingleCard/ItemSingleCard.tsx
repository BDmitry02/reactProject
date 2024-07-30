import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Favorite from '../FavoriteIcon/FavoriteIcon';
import React from 'react';
type ItemSingleCardProps = {
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

const ItemSingleCard = React.memo(({ product }: ItemSingleCardProps) => {
  const { _id, title, price, previewImage } = product;
  return (
    <StyledLink to={`/item/${_id}`}>
      <StyledItemCard>
        <StyledImageCardContainer>
          <StyledPreviewImage src={previewImage} alt="" />
          <StyledDescriptionText>
            <StyledItemTitle>
              {title.length < 25 ? title : title.slice(0, 25) + '...'}
            </StyledItemTitle>
            <StyledPriceAndFav>
              <StyledPrice>
                ${typeof price === 'number' ? price.toFixed(2) : price}
              </StyledPrice>
              <Favorite id={_id} />
            </StyledPriceAndFav>
          </StyledDescriptionText>
        </StyledImageCardContainer>
      </StyledItemCard>
    </StyledLink>
  );
});

export default ItemSingleCard;

const StyledPreviewImage = styled.img`
  width: 200px;
  height: 200px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const StyledItemCard = styled.div`
  width: 270px;
  height: 305px;
  background-color: ${(props) => props.theme.itemCardBgColor};
  padding: 20px;
  border-radius: 25px;

  @media (max-width: 768px) {
    width: 150px;
    height: 180px;
  }
`;

const StyledImageCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
`;

const StyledPrice = styled.p`
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
  margin: 0;
  margin-top: auto;
`;

const StyledItemTitle = styled.p`
  font-size: 16px;
  margin: 0;
  height: 70px;
`;

const StyledDescriptionText = styled.div`
  display: flex;
  width: 200px;
  text-align: center;
  flex-direction: column;
  gap: 20px;
  height: 80px;

  @media (max-width: 768px) {
    width: 150px;
    height: 60px;
    gap: 5px;
  }
`;

const StyledPriceAndFav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
