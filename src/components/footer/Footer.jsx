import React from "react";
import { Box, Flex, Link, Text, IconButton } from "@chakra-ui/react";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py="4"
      px={{ base: "4", md: "8" }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
      >
        <Text>&copy; 2024 Your Website. All rights reserved.</Text>
        <Flex>
          <IconButton
            as={Link}
            href="https://github.com/yourgithub"
            target="_blank"
            aria-label="GitHub"
            icon={<FiGithub />}
            variant="ghost"
            colorScheme="teal"
            mr="2"
          />
          <IconButton
            as={Link}
            href="https://twitter.com/yourtwitter"
            target="_blank"
            aria-label="Twitter"
            icon={<FiTwitter />}
            variant="ghost"
            colorScheme="teal"
            mr="2"
          />
          <IconButton
            as={Link}
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            aria-label="LinkedIn"
            icon={<FiLinkedin />}
            variant="ghost"
            colorScheme="teal"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
