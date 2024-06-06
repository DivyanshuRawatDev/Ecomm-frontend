import React from 'react';
import { Box, Flex, Image, Text, useColorModeValue, VStack } from '@chakra-ui/react';

const About = () => {
  return (
    <Box
      minHeight="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      className="flex items-center justify-center p-8"
    >
      <VStack spacing={8} className="w-full max-w-4xl">
        <Image
          src="https://i.ibb.co/gPcm5Xd/me.png"
          alt="Founder"
          className="rounded-full shadow-md"
          boxSize={{ base: '200px', md: '300px' }}
        />
        <Box textAlign="center">
          <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" className="text-gray-800 dark:text-gray-300">
             Divyanshu Rawat
          </Text>
          <Text mt={2} fontSize={{ base: 'lg', md: 'xl' }} className="text-gray-600 dark:text-gray-400">
            Founder & CEO
          </Text>
        </Box>
        <Box textAlign="center" maxWidth="800px">
          <Text fontSize={{ base: 'md', md: 'lg' }} className="text-gray-600 dark:text-gray-400">
            Our company, founded by Divyanshu Rawat, is committed to delivering the best products
            and services to our customers. With a passion for innovation and a dedication to
            quality, we strive to exceed expectations and set new standards in our industry.
            Join us on our journey to make the world a better place, one step at a time.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
