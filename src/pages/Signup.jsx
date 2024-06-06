import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchSignup } from "../redux/slices/userSlice";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setFormData({
      username: "",
      email: "",
      password: "",
    });
    dispatch(fetchSignup(formData)).then((action) => {
      if (action.payload?.userData) {
        navigate("/login");
        toast.success(action?.payload?.message);
      }
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={4} borderWidth="1px" borderRadius="lg">
      <Heading as="h2" mb={6} textAlign="center">
        Sign Up
      </Heading>
      <form onSubmit={handleSignup}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" colorScheme="teal">
            Sign Up
          </Button>
        </Stack>
      </form>
      <Box mt={4} textAlign="center">
        Already have an account?{" "}
        <Button
          as={RouterLink}
          to="/login"
          colorScheme="teal"
          variant="link"
          size="sm"
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
