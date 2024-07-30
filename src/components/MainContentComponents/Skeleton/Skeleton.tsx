import styled from 'styled-components';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export function SkeletonLoader() {
  const skeletons = Array.from(new Array(8)).map((_, index) => (
    <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
      </Box>
    </Box>
  ));

  return <>{skeletons}</>;
}

export function SkeletonFilters() {
  const skeletons = Array.from(new Array(5)).map((_, index) => (
    <StyledSkeletonBox key={index} sx={{ width: 200 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </StyledSkeletonBox>
  ));

  return <>{skeletons}</>;
}

const StyledSkeletonBox = styled(Box)`
  margin-top: 20px;
  margin-left: 10px;
`;
