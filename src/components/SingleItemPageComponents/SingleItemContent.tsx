import styled from 'styled-components';
import Favorite from '../MainContentComponents/FavoriteIcon/FavoriteIcon';
import { useTranslation } from 'react-i18next';

type Product = {
  _id: string;
  title: string;
  price: string | number;
  description: string;
  previewImage: string;
  bigImage: string;
  category: string;
};

interface SingleItemContentProps {
  product: Product[];
}

function SingleItemContent({ product }: SingleItemContentProps) {
  const { t } = useTranslation();
  if (product.length > 0) {
    const { _id, bigImage, title, price, description } = product[0];

    return (
      <StyledItemWrapper>
        <StyledItemContainer>
          <StyledLeftSideContentContainer>
            <img src={bigImage} alt={title} />
          </StyledLeftSideContentContainer>
          <StyledRightSideContentContainer>
            <StyledItemHeader>{title}</StyledItemHeader>
            <Favorite id={_id} />
            <StyledItemHeader>
              {t(`itemPagePrice`)}: ${price}
            </StyledItemHeader>
          </StyledRightSideContentContainer>
        </StyledItemContainer>
        <StyledItemDescription>
          {t(`itemPageDescription`)}: {description}
        </StyledItemDescription>
      </StyledItemWrapper>
    );
  }
}

export default SingleItemContent;

const StyledItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 55px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const StyledLeftSideContentContainer = styled.div`
  display: flex;

  & img {
    width: 25vw;
  }

  @media (max-width: 768px) {
    & img {
      width: 45vw;
    }
  }

  @media (max-width: 480px) {
    & img {
      width: 40vw;
    }
  }
`;

const StyledRightSideContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 30vw;
`;

const StyledItemHeader = styled.p`
  font-weight: 400;
  font-size: 24px;

  @media (max-width: 480px) {
    font-weight: 400;
    font-size: 16px;
  }
`;

const StyledItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledItemDescription = styled.div`
  padding: 20px;
  font-weight: 400;
  font-size: 24px;

  @media (max-width: 480px) {
    font-weight: 400;
    font-size: 16px;
  }
`;
