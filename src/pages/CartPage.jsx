import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProduct } from "../redux/slices/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store?.cart);

  useEffect(() => {
    dispatch(fetchCartProduct());
  }, [dispatch]);
  console.log(cart);
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/150",
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 49.99,
      imageUrl: "https://via.placeholder.com/150",
      quantity: 1,
    },
  ];

  const calculateTotal = () => {
    return (
      cart
        ?.reduce((acc, curr) => acc + curr?.productId?.price * curr.quantity, 0)
        .toFixed(2) || 0
    );
  };

  return (
    <Box p={4}>
      <Heading mb={4} textAlign="center">
        Shopping Cart
      </Heading>
      <VStack spacing={4} align="stretch">
        {cart?.map((item) => (
          <Flex
            key={item.id}
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            borderWidth={1}
            borderRadius="lg"
            p={4}
            boxShadow="md"
          >
            <Image
              src={item?.productId?.imageUrl}
              alt={item.name}
              boxSize={{ base: "100%", md: "150px" }}
              objectFit="cover"
              borderRadius="lg"
              mb={{ base: 4, md: 0 }}
            />
            <Box
              flex="1"
              mx={{ base: 0, md: 4 }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Text fontWeight="bold" fontSize="xl">
                {item.productId.title}
              </Text>
              <Text mt={2} fontSize="lg">
                {item?.productId?.description}
              </Text>
              <Text mt={2} fontSize="lg">
                Rs.{item?.productId?.price.toFixed(2)}
              </Text>
            </Box>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              mt={{ base: 4, md: 0 }}
            >
              <Input
                type="number"
                value={item.quantity}
                onChange={() => {
                  console.log("lo");
                }}
                width="60px"
                mr={2}
                textAlign="center"
              />
              <Button colorScheme="red">Remove</Button>
            </Flex>
          </Flex>
        ))}
      </VStack>
      <Box mt={8} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          Total: Rs.{calculateTotal()}
        </Text>
        <Button colorScheme="teal" size="lg" mt={4}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
