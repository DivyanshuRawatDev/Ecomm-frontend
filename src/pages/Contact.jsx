import React from 'react';
import {
  Box,
  Flex,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

const Contact = () => {
  return (
    <Box
      minHeight="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      className="flex items-center justify-center p-8"
    >
      <VStack
        spacing={8}
        className="w-full max-w-lg p-6 rounded-lg shadow-lg border"
        borderColor={useColorModeValue('gray.300', 'gray.700')}
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Heading as="h1" size="xl" className="text-gray-900 dark:text-gray-400">
          Contact Us
        </Heading>
        <FormControl id="name" isRequired>
          <FormLabel className="text-gray-900 dark:text-gray-200">Name</FormLabel>
          <Input
            placeholder="Your Name"
            className="bg-gray-100 dark:bg-gray-700"
            size="lg"
            variant="filled"
            focusBorderColor="teal.400"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel className="text-gray-900 dark:text-gray-200">Email</FormLabel>
          <Input
            type="email"
            placeholder="your.email@example.com"
            className="bg-gray-100 dark:bg-gray-700"
            size="lg"
            variant="filled"
            focusBorderColor="teal.400"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>
        <FormControl id="message" isRequired>
          <FormLabel className="text-gray-900 dark:text-gray-200">Message</FormLabel>
          <Textarea
            placeholder="Your Message"
            className="bg-gray-100 dark:bg-gray-700"
            size="lg"
            variant="filled"
            focusBorderColor="teal.400"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          size="lg"
          className="w-full"
          _hover={{
            bg: 'teal.500',
          }}
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default Contact;
