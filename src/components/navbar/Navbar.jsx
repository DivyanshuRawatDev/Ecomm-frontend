import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Image,
  VStack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/constants";
import { useSelector } from "react-redux";

const Links = ["Home", "Shop", "About", "Contact"];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const { isSuccess } = useSelector((store) => store.user);

  useEffect(() => {
    console.log("Inside useEffect navbar")
    const checkLoginStatus = () => {
      const userCookie = getCookie("uid");
      console.log("inside checkLoginStatus navbar")
      if (userCookie) {
        setIsLoggedIn(true);
        console.log("userCookie navbar")
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();

    if (isSuccess) {
      console.log("it's success navbar")
      checkLoginStatus();
    }
  }, [isSuccess]);

  return (
    <Box bg={useColorModeValue("white", "gray.800")} px={4} shadow="md">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>
            <Image
              src="https://via.placeholder.com/150"
              alt="Logo"
              boxSize="40px"
            />
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <IconButton
            size={"md"}
            icon={<FiShoppingCart />}
            aria-label={"Cart"}
            mr={4}
            onClick={() => {
              navigate("/cart")
            }}
          />
          {isLoggedIn ? (
            <Menu>
              <MenuButton
                as={Button}
                variant={"ghost"}
                colorScheme={"teal"}
                size={buttonSize}
                rightIcon={<FiUser />}
              >
                User
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => navigate("/admin")}>Admin</MenuItem>
                <MenuItem onClick={() => navigate("/logout")}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                variant={"solid"}
                colorScheme={"teal"}
                size={buttonSize}
                mr={4}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </Button>
              <Button
                variant={"outline"}
                colorScheme={"teal"}
                size={buttonSize}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <VStack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </VStack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
