import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/slices/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => {
    return store.user;
  });

  console.log(userData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   console.log("Sending request to /auth/login"); // Log before sending request
  //   try {
  //     const response = await fetch("http://localhost:8080/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     console.log("Response received"); // Log after receiving response
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(fetchLogin({ email, password }));
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      textAlign="center"
    >
      <Heading as="h2" mb={6}>
        Log In
      </Heading>
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Log In
          </Button>
        </Stack>
      </form>
      <Box mt={4}>
        Don't have an account?{" "}
        <Button
          as={RouterLink}
          to="/signup"
          colorScheme="teal"
          variant="link"
          size="sm"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
