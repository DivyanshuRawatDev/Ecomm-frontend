import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  useColorModeValue,
  VStack,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePic } from "../redux/slices/profileSlice";
import { fetchUpdateUsername } from "../redux/slices/userSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [editMode, setEditMode] = useState({
    name: false,
    address: false,
  });

  const dispatch = useDispatch();

  const { image } = useSelector((store) => {
    return store?.profile;
  });
  const { user } = useSelector((store) => {
    return store?.user;
  });
  console.log(user);
  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageUpload = (e) => {
    const file = e?.target?.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("profilePic", file);

      dispatch(updateProfilePic(formData));
    }
  };

  const handleSaveUsername = () => {
    dispatch(fetchUpdateUsername(username));
    setEditMode({ ...editMode, name: false });
  };

  return (
    <Box
      minHeight="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      className="flex items-center justify-center p-8"
    >
      <Box
        className="w-full max-w-md p-6 rounded-lg shadow-lg"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.300", "gray.700")}
        borderWidth="1px"
      >
        <Flex direction="column" align="center">
          <Heading
            as="h1"
            size="xl"
            className="mb-4 text-gray-900 dark:text-gray-400"
          >
            Profile
          </Heading>
          <Box className="relative mb-4">
            <Avatar
              size="2xl"
              src={image?.image}
              className="cursor-pointer"
              onClick={handleImageClick}
            />
            <input
              type="file"
              id="imageInput"
              className="hidden"
              onChange={handleImageUpload}
            />
          </Box>
          <VStack spacing={4} className="w-full">
            <FormControl id="name" className="mb-4" isRequired>
              <FormLabel className="text-gray-900 dark:text-gray-200">
                Name
              </FormLabel>
              <HStack>
                <Input
                  name="name"
                  placeholder="Your Name"
                  className="bg-gray-100 dark:bg-gray-700"
                  size="lg"
                  variant="filled"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  defaultValue={user?.username}
                  isReadOnly={!editMode.name}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {editMode.name ? (
                  <Tooltip label="Save" aria-label="Save">
                    <IconButton
                      icon={<CheckIcon />}
                      size="sm"
                      aria-label="Save Name"
                      colorScheme="teal"
                      onClick={handleSaveUsername}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip label="Edit" aria-label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      aria-label="Edit Name"
                      colorScheme="gray"
                      onClick={() => setEditMode({ ...editMode, name: true })}
                    />
                  </Tooltip>
                )}
              </HStack>
            </FormControl>
            <FormControl id="email" className="mb-4" isRequired>
              <FormLabel className="text-gray-900 dark:text-gray-200">
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="bg-gray-100 dark:bg-gray-700"
                size="lg"
                variant="filled"
                focusBorderColor="teal.400"
                _placeholder={{ color: "gray.500" }}
                value={user?.email}
                isReadOnly
              />
            </FormControl>
            <FormControl id="address" className="mb-4" isRequired>
              <FormLabel className="text-gray-900 dark:text-gray-200">
                Address
              </FormLabel>
              <HStack>
                <Input
                  name="address"
                  placeholder="Your Address"
                  className="bg-gray-100 dark:bg-gray-700"
                  size="lg"
                  variant="filled"
                  focusBorderColor="teal.400"
                  _placeholder={{ color: "gray.500" }}
                  value={address}
                  isReadOnly={user?.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {editMode.address ? (
                  <Tooltip label="Save" aria-label="Save">
                    <IconButton
                      icon={<CheckIcon />}
                      size="sm"
                      aria-label="Save Address"
                      colorScheme="teal"
                      onClick={() =>
                        setEditMode({ ...editMode, address: false })
                      }
                    />
                  </Tooltip>
                ) : (
                  <Tooltip label="Edit" aria-label="Edit">
                    <IconButton
                      icon={<EditIcon />}
                      size="sm"
                      aria-label="Edit Address"
                      colorScheme="gray"
                      onClick={() =>
                        setEditMode({ ...editMode, address: true })
                      }
                    />
                  </Tooltip>
                )}
              </HStack>
            </FormControl>
          </VStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
