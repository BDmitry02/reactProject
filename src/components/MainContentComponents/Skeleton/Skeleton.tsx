import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function SkeletonLoader() {
  const skeletons = Array.from(new Array(10)).map((_, index) => (
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

export default SkeletonLoader;
