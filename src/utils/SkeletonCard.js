import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Skeleton,
    SkeletonText,
  } from "@chakra-ui/react";
  import React from "react";
  
  const SkeletonCard = () => {
    return (
      <Card maxW="md"> {/* Changed from 'sm' to 'md' */}
        <CardBody>
          <Skeleton height="200px" borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Skeleton height="20px" width="70%" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
            <Skeleton height="20px" width="50%" />
          </Stack>
        </CardBody>
        <CardFooter>
          <Stack direction="row" spacing="2">
            <Skeleton height="40px" width="120px" borderRadius="md" />
            <Skeleton height="40px" width="120px" borderRadius="md" />
          </Stack>
        </CardFooter>
      </Card>
    );
  };
  
  export default SkeletonCard;
  