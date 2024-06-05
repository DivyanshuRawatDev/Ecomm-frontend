import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Cards = ({ data }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addProductToCart({ productId: data._id, quantity: 1 })).then(
      (action) => {
        if (action?.payload?.data?.message === "Product Already Added") {
          toast.warning(action?.payload?.data?.message);
        } else {
          toast.success(action?.payload?.data?.message);
        }
      }
    );
  };

  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={data?.imageUrl}
            alt={data?.title}
            borderRadius="lg"
            width="100%"
            height="250px"
            objectFit="cover"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{data?.title}</Heading>
            <Text>
              {data?.description.length <= 50
                ? data?.description
                : data?.description.split("").slice(0, 50).join("") + "..."}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              Rs.{data?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Cards;
